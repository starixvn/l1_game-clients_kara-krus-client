import gc from "@sg/game-client-base";
import { _decorator } from "cc";
import { ResultPercentage } from "../../../../extensions/shared-components/assets/game/result-percentage/scripts/result-percentage";
const { ccclass } = _decorator;
@ccclass
export class KaraKrusResultPercentage extends ResultPercentage {
    calculateWinPercentage(originalChoices: string[], roundHistory: gc.RoundHistories.RoundHistory[]): Record<string, number> {
        const count = super.calculateWin(originalChoices, roundHistory);
        const total = roundHistory.length;

        // Initialize the percentage object
        const percentage: Record<string, number> = {};

        // Calculate primary percentages
        let karaValue = Math.round((count["kara"] * 100) / total);
        let head3Value = Math.round((count["head3"] * 100) / total);
        let head1Value = Math.round((count["head1"] * 100) / total);

        // Ensure valid red and red3 relationship
        if (head3Value > karaValue) {
            head3Value = karaValue; // Adjust red3 to be no more than red
        }

        // Calculate secondary values
        let head2Value = karaValue - head3Value;
        let krusValue = 100 - karaValue;
        let tail3Value = krusValue - head1Value;

        // Adjust to ensure non-negative values
        if (tail3Value < 0) {
            tail3Value = 0;
            head1Value = krusValue; // Adjust red1 to ensure total
        }

        // Final adjustments
        karaValue = head2Value + head3Value;
        krusValue = head1Value + tail3Value;

        const totalPercentage = karaValue + krusValue;
        const difference = 100 - totalPercentage;

        if (difference !== 0) {
            // Adjust to make total exactly 100%
            if (tail3Value + difference >= 0) {
                tail3Value += difference;
            } else {
                head2Value += difference;
            }
        }

        // Assign calculated values to percentage object
        percentage["kara"] = karaValue;
        percentage["head2"] = head2Value;
        percentage["head3"] = head3Value;
        percentage["head1"] = head1Value;
        percentage["krus"] = krusValue;
        percentage["tail3"] = tail3Value;

        return percentage;
    }
}
