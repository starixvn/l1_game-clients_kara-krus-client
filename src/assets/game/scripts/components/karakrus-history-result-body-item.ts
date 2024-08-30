import gc from "@sg/game-client-base";
import { _decorator, Sprite, SpriteFrame } from "cc";
import { BaseResultBodyItem } from "../../../../extensions/shared-components/assets/game/bet-history/scripts/components/bet-history-body-item";

const { ccclass, property } = _decorator;

@ccclass()
export class KaraKrusResultBodyItem extends BaseResultBodyItem {
    @property(SpriteFrame)
    sprKara: SpriteFrame = null;

    @property(SpriteFrame)
    sprKrus: SpriteFrame = null;

    setData(result: gc.BetHistory.DynamicObject<object>, settlementResult: gc.BetHistory.DynamicObject<boolean>) {
        const values = Object.values(result);
        values.sort((a, b) => Number(b) - Number(a));
        this.node.getComponentsInChildren(Sprite).forEach((component, i) => {
            component.spriteFrame = values[i] ? this.sprKara : this.sprKrus;
        });
    }
}
