import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    NgZone,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Subject, takeUntil, Observable } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Chat } from 'app/modules/admin/chat/chat.types';
import { ChatService } from 'app/modules/admin/chat/chat.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiconversacionesService } from 'app/services/apiconversaciones.service';
import { ApibandejaService } from 'app/services/apibandeja.service';
import { DeleteComponent } from '../delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import Pusher  from 'pusher-js'
import { Store } from '@ngxs/store';
import { UserInfo } from 'app/models/userInfo'



@Component({
    selector: 'chat-conversation',
    templateUrl: './conversation.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationComponent implements OnInit, OnDestroy {
    user$: Observable<UserInfo>;
    @ViewChild('messageInput') messageInput: ElementRef;
    chat: Chat;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = false;
    destinatario: string = '---';
    mensaje = '';
    disableInput = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    rolId=0;
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _chatService: ChatService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _ngZone: NgZone,
        private route: ActivatedRoute,
        private _api: ApiconversacionesService,
        private _dialog: MatDialog,
        private _apiBandeja: ApibandejaService,
        private store: Store
    )
    {
        this.user$ = this.store.select(state => state.user.user);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Decorated methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resize on 'input' and 'ngModelChange' events
     *
     * @private
     */
    @HostListener('input')
    @HostListener('ngModelChange')
    private _resizeMessageInput(): void {
        // This doesn't need to trigger Angular's change detection by itself
        this._ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                // Set the height to 'auto' so we can correctly read the scrollHeight
                this.messageInput.nativeElement.style.height = 'auto';

                // Detect the changes so the height is applied
                this._changeDetectorRef.detectChanges();

                // Get the scrollHeight and subtract the vertical padding
                this.messageInput.nativeElement.style.height = `${this.messageInput.nativeElement.scrollHeight}px`;

                // Detect the changes one more time to apply the final height
                this._changeDetectorRef.detectChanges();
            });
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.user$
        .subscribe((user: UserInfo) => {
            this.rolId = user.idRol;
        });
        // Chat
        this._chatService.chat$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((chat: Chat) => {
                this.chat = chat;


                if (chat.muted) this.disableInput = true;
                else this.disableInput = false;
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // interval(9000).subscribe(() => {
        //     this._chatService
        //         .getChatById(this.route.snapshot.paramMap.get('id'))
        //         .pipe(
        //             catchError((error) => {
        //                 // Log the error
        //                 console.error(error);

        //                 return throwError(error);
        //             })
        //         )
        //         .subscribe((chat: Chat) => {
        //             this.chat = chat;

        //             var cerrada = this.route.snapshot.paramMap
        //                 .get('id')
        //                 .split('-')[3];
        //             if (cerrada == 'True') this.disableInput = true;
        //             else this.disableInput = false;

        //             //console.log('this.disableInput', this.disableInput);
        //             // Mark for check
        //             this._changeDetectorRef.markForCheck();
        //         });
        // });

        //CHAT WITH PUSHER
        Pusher.logToConsole = true;

            var pusher = new Pusher('287874660f17f5c20e70', {
            cluster: 'us2'
            });

            var channel = pusher.subscribe('BotChat');
            channel.bind('getChat', data => {
               // this.chat.messages  = null;
                 console.log('Conversation', data);
               var dest = this.route.snapshot.paramMap
               .get('id')
               .split('-')[1];

               if(data.id == dest)
                {
                    var r = JSON.parse(data.message);

                    this.chat.messages.push(r);

                    this._changeDetectorRef.markForCheck();
                }
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Set the drawerMode if the given breakpoint is active
                if (matchingAliases.includes('lg')) {
                    this.drawerMode = 'side';
                } else {
                    this.drawerMode = 'over';
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    add() {
        //console.log("jrjrhhdhdgd");
        var _dest = this.route.snapshot.paramMap.get('id').split('-')[1];
        var _bandeja = this.route.snapshot.paramMap.get('id').split('-')[2];

        if (this.mensaje != '') {
            this._api.add({
                Destinatario: _dest,
                Tipo: 'Asesor',
                Mensaje: this.mensaje,
                BandejaId: parseInt(_bandeja),
                RolId: this.rolId
            });
            this.mensaje = '';
        }
    }
    fileSelected(file: File) {
        var _dest = this.route.snapshot.paramMap.get('id').split('-')[1];
        var _bandeja = this.route.snapshot.paramMap.get('id').split('-')[2];

        this._api.add({
            Destinatario: _dest,
            Tipo: 'Asesor',
            Mensaje: 'Haz recibido un Archivo',
            BandejaId: parseInt(_bandeja),
            Imagen: file,
            RolId: this.rolId
        });
    }
    cerrar() {
        var _bandeja = this.route.snapshot.paramMap.get('id').split('-')[2];
        var _dest = this.route.snapshot.paramMap.get('id').split('-')[1];

        var _bandejaId = parseInt(_bandeja);
        const dialogRef = this._dialog.open(DeleteComponent, {
            width: '400px',
            data: {
                titulo:
                    '¿Esta seguro de Finalizar la conversacion de ' +
                    _dest +
                    '?',
            },
        });
        dialogRef.afterClosed().subscribe((x) => {
            if (x) {
                this._apiBandeja
                    .cerrar({
                        id: _bandejaId,
                        destinatario: _dest,
                        visto: true,
                        asesor: 'yo',
                        rolId: this.rolId
                    })
                    .subscribe((res) => {
                        if (res !== undefined) {
                            this.disableInput = true;
                        }
                    });
            }
        });
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Open the contact info
     */
    openContactInfo(): void {
        // Open the drawer
        this.drawerOpened = true;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Reset the chat
     */
    resetChat(): void {
        this._chatService.resetChat();

        // Close the contact info in case it's opened
        this.drawerOpened = false;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle mute notifications
     */
    toggleMuteNotifications(): void {
        // Toggle the muted
        this.chat.muted = !this.chat.muted;

        // Update the chat on the server
        this._chatService.updateChat(this.chat.id, this.chat).subscribe();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
