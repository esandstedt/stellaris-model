import { Pair, asDictionary, asPairArray, asString } from "../../compile";

export class BudgetImpl {
  constructor(pairs: Pair[]) {
    var data = asDictionary(pairs);

    var currentMonth = asDictionary(data["current_month"]);

    var balance = asPairArray(currentMonth["balance"])
      .map(x =>
        asPairArray(x.value).map(y => ({
          type: x.key,
          resource: y.key,
          amount: parseFloat(asString(y.value))
        }))
      )
      .reduce((a, b) => a.concat(b));

    //balance.forEach(x => console.log(x.resource, x.amount, x.type));
  }
}
