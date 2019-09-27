import { Pair, asDictionary, asPairArray, asString } from "../../compile";

export class BudgetImpl {
  constructor(pairs: Pair[]) {
    var data = asDictionary(pairs);

    var currentMonth = asDictionary(data["current_month"]);

    var balance = asPairArray(currentMonth["balance"])
      .map(x =>
        asPairArray(x.value).map(y => ({
          type: x.key as string,
          resource: y.key as string,
          amount: parseFloat(asString(y.value))
        }))
      )
      .reduce((a, b) => a.concat(b));

    var resources: any = {};

    balance.forEach(({ type, resource, amount }) => {
      if (!resources[resource]) {
        resources[resource] = {
          items: [],
          total: 0
        };
      }

      resources[resource].items.push({
        type,
        amount
      });
      resources[resource].total += amount;
    });

    console.log(JSON.stringify(resources));

    //balance.forEach(x => console.log(x.resource, x.amount, x.type));
  }
}
