import gc from "@sg/game-client-base";
import { _decorator, Label } from "cc";

import { LedLightTooltip } from "../../../../extensions/shared-components/assets/game/led-light/scripts/components/led-light-tooltip";

const { ccclass, property } = _decorator;

const BetChoice = {
    KARA: "kara",
    KRUS: "krus",
};

@ccclass()
export class KarakrusLedLightToolTip extends LedLightTooltip {
    @property(Label)
    lblKara: Label = null;

    @property(Label)
    lblKrus: Label = null;

    private readonly dotsTotal = 3;

    public setTooltipInfo(ledLightInfo: gc.RoundHistories.RoundHistory) {
        const { roundId, settlementResult, result } = ledLightInfo;

        this.roundId.string = `#${roundId}`;
        const choiceWin = settlementResult[BetChoice.KARA] ? BetChoice.KARA : BetChoice.KRUS;
        this.result.string = gc.Translator.gameTranslate(`glossary_${choiceWin}`).toUpperCase();

        let countKara = 0;
        Object.values(result).forEach((value) => {
            if (value) {
                countKara++;
            }
        });
        this.lblKara.string = `${countKara}`;
        this.lblKrus.string = `${this.dotsTotal - countKara}`;
    }
}
