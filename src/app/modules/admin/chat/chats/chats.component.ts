import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { Subject, takeUntil, interval, catchError, throwError, Observable } from 'rxjs';
import { Chat, Profile } from 'app/modules/admin/chat/chat.types';
import { ChatService } from 'app/modules/admin/chat/chat.service';
import Pusher  from 'pusher-js'
import { Store } from '@ngxs/store';
import { UserInfo } from 'app/models/userInfo'


@Component({
    selector       : 'chat-chats',
    templateUrl    : './chats.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsComponent implements OnInit, OnDestroy, AfterViewChecked
{
    user$: Observable<UserInfo>;
    chats: Chat[];
    drawerComponent: 'profile' | 'new-chat';
    drawerOpened: boolean = false;
    filteredChats: Chat[];
    profile: Profile;
    selectedChat: Chat;
    changes = false;
    userName = '';
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _chatService: ChatService,
        private _changeDetectorRef: ChangeDetectorRef,
        private store: Store
    )
    {
        this.user$ = this.store.select(state => state.user.user);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngAfterViewChecked(): void {
        //alert('cambio');
        if (this.changes)
        {
            this._chatService.getChats()
                .pipe(
                    catchError((error) => {

                        // Log the error
                        console.error(error);

                        return throwError(error);
                    })
                ).subscribe((chats: Chat[]) => {
                    this.chats = this.filteredChats = chats;

                // Mark for check
                this._changeDetectorRef.markForCheck();
                });
            this.changes = false;
        }
    }
    ngOnInit(): void
    {
        this.user$
            .subscribe((user: UserInfo) => {
                console.log('userCHat', user);
                this.userName = user.name;
            });
        // Chats
        this._chatService.chats$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((chats: Chat[]) => {
                this.chats = this.filteredChats = chats;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
        //     interval(9000).subscribe(()=>{
        //         this._chatService.getChats()
        //         .pipe(
        //             catchError((error) => {

        //                 // Log the error
        //                 console.error(error);

        //                 return throwError(error);
        //             })
        //         ).subscribe((chats: Chat[]) => {
        //             this.chats = this.filteredChats = chats;

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //         });

        //       });

        //CHAT WITH PUSHER
        Pusher.logToConsole = true;

            var pusher = new Pusher('287874660f17f5c20e70', {
            cluster: 'us2'
            });

            var channel = pusher.subscribe('BotChat');
            channel.bind('getChats', data => {
                var _chat = JSON.parse(data.message);
                 //console.log('hubo un cambio', r);
                 //this.changes = true;
                var _chatSelected = this.chats.find(x => x.conversation === _chat.conversation);

                if(_chatSelected != undefined || _chatSelected != null)
                {
                    _chatSelected.unreadCount = _chat.unreadCount;
                    _chatSelected.lastMessage = _chat.lastMessage;
                    _chatSelected.muted = _chat.muted;
                    _chatSelected.lastMessageAt = _chat.lastMessageAt;
                    _chatSelected.id = _chat.id;

                    var _filteredchatSelected = this.filteredChats.find(x => x.conversation === _chat.conversation);

                    _filteredchatSelected.unreadCount = _chat.unreadCount;
                    _filteredchatSelected.lastMessage = _chat.lastMessage;
                    _filteredchatSelected.muted = _chat.muted;
                    _filteredchatSelected.lastMessageAt = _chat.lastMessageAt;
                    _filteredchatSelected.id = _chat.id;

                }
                else{
                    this.chats.push(_chat);
                    this.filteredChats.push(_chat);
                }

                // this.chats = this.filteredChats = r; original
                this._changeDetectorRef.markForCheck();
            });

        // Profile
        this._chatService.profile$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((profile: Profile) => {
                this.profile = profile;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Selected chat
        this._chatService.chat$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((chat: Chat) => {
                this.selectedChat = chat;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter the chats
     *
     * @param query
     */
    filterChats(query: string): void
    {
        // Reset the filter
        if ( !query )
        {
            this.filteredChats = this.chats;
            return;
        }

        this.filteredChats = this.chats.filter(chat => chat.contact.name.toLowerCase().includes(query.toLowerCase()));
    }

    /**
     * Open the new chat sidebar
     */
    openNewChat(): void
    {
        this.drawerComponent = 'new-chat';
        this.drawerOpened = true;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Open the profile sidebar
     */
    openProfile(): void
    {
        this.drawerComponent = 'profile';
        this.drawerOpened = true;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
