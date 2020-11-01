import { h } from "tsx-dom";
export class Dialog {
    readonly id: string;
    readonly dialog: HTMLElement;
    private pos: number[] = [0, 0, 0, 0];
    constructor(
        content: string | HTMLElement,
        title: string | HTMLElement,
        id?: string
    ) {
        if (
            !content ||
            !(typeof content === "string" || content instanceof HTMLElement)
        ) {
            throw new TypeError("Message is not a string or HTMLElement!");
        }
        if (
            !title ||
            !(typeof title === "string" || title instanceof HTMLElement)
        ) {
            throw new TypeError("Message is not a string or HTMLElement!");
        }

        const _id = id ?? Dialog.generateID();
        this.id = _id;

        this.dialog = (
            <div
                id={_id}
                class="dialog"
                style={{
                    //border: "2px solid black",
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    background: "#c5c5c5",
                }}
            >
                <div
                    id={`${_id}_titlebar`}
                    class="dialog_titlebar"
                    style={{
                        background: "#dddddd",
                        cursor: "move",
                    }}
                    onMouseDown={(e) => {
                        this.pos[2] = e.clientX;
                        this.pos[3] = e.clientY;
                        document.onmouseup = () => {
                            document.onmouseup = null;
                            document.onmousemove = null;
                        };
                        document.onmousemove = (e2) => {
                            e2.preventDefault();
                            this.pos[0] = this.pos[2] - e2.clientX;
                            this.pos[1] = this.pos[3] - e2.clientY;
                            this.pos[2] = e2.clientX;
                            this.pos[3] = e2.clientY;
                            this.dialog.style.top =
                                this.dialog.offsetTop - this.pos[1] + "px";
                            this.dialog.style.left =
                                this.dialog.offsetLeft - this.pos[0] + "px";
                        };
                    }}
                >
                    {title}
                    <button
                        id={`${_id}_titlebar_closebtn`}
                        class="dialog_titlebar_closebtn right"
                        //onClick={this.cancel}
                    >
                        x
                    </button>
                </div>
                {content}
            </div>
        );
        document.body.appendChild(this.dialog);
        (document.getElementById(
            `${_id}_titlebar_closebtn`
        ) as HTMLElement).onclick = () => this.cancel();
    }

    cancel() {
        this.dialog.remove();
    }

    static generateID() {
        return `dialog_${~~(Math.random() * 9999)}`;
    }
}

export interface DialogControlButtons {
    confirm?: string;
    cancel?: string;
}

export const DefaultDialogControlButtons: DialogControlButtons = {
    confirm: "OK",
    cancel: "Cancel",
};
