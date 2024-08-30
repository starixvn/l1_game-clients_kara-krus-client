import { _decorator, tween, UIOpacity } from "cc";

import MD5Component, { MD5Type } from "../../../../extensions/shared-components/assets/game/md5/scripts/md5-component";

const { ccclass, property } = _decorator;

export type ExtraInfos = {
    head1: boolean;
    head2: boolean;
    head3: boolean;
};

@ccclass()
export class KaraKrusMD5 extends MD5Component {
    readonly DICE_KARA = `<img src="dice-kara" />`;
    readonly DICE_KRUS = `<img src="dice-krus" />`;

    private tipForHash = false;

    generateMD5Result(data: MD5Type) {
        let result = "";
        if (!!data.extraInfos) {
            const totalHead = Object.values(data.extraInfos).filter((value) => value === true).length;
            const chipResult = this.generateChips(totalHead);
            const suffix = data.rawValue.split("_");
            const suffixFormatLength = suffix[1].length > this.lengthOfMd5 ? suffix[1].slice(0, this.lengthOfMd5) + "..." : suffix[1];
            result = `{${chipResult}}_${suffixFormatLength}`;
            this.tipString = `{${chipResult}}_${suffix[1]}`;
        }
        if (!!data.hashValue) {
            result = data.hashValue;
        }
        this.lblMd5Value && (this.lblMd5Value.string = `${result}`);
    }

    generateChips(totalHead: number) {
        const chips = {
            0: `${this.DICE_KRUS} ${this.DICE_KRUS} ${this.DICE_KRUS}`,
            1: `${this.DICE_KARA} ${this.DICE_KRUS} ${this.DICE_KRUS}`,
            2: `${this.DICE_KARA} ${this.DICE_KARA} ${this.DICE_KRUS}`,
            3: `${this.DICE_KARA} ${this.DICE_KARA} ${this.DICE_KARA}`,
        };

        return chips.hasOwnProperty(totalHead) ? chips[totalHead] : "";
    }

    protected setDataTip(data: gc.GameServiceMessage.ResultHash) {
        if (!!data.hashValue) {
            this.tipString = data.hashValue;
        }

        this.tipForHash = !!data.hashValue;
    }

    protected showTooltip() {
        if (this.tipString && this.md5Tip && !this.tipForHash) {
            this.md5Tip.setData(this.tipString);
            this.md5Tip.show(true);
            tween(this.md5Tip.node.getComponent(UIOpacity)).to(0.2, { opacity: 255 }).delay(2).to(0.1, { opacity: 0 }).start();
        }
    }
}
