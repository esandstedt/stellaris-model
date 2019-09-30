import { Pair, asDictionary, asPairArray, asString } from "../../compile";
import { Budget } from "../..";
import { BudgetResource } from "../interfaces";

export class BudgetImpl implements Budget {
  public alloys: BudgetResource;
  public consumerGoods: BudgetResource;
  public energy: BudgetResource;
  public food: BudgetResource;
  public influence: BudgetResource;
  public minerals: BudgetResource;
  public unity: BudgetResource;
  public research: {
    engineering: BudgetResource;
    physics: BudgetResource;
    society: BudgetResource;
    total: number;
  };
  public strategic: {
    volatileMotes: BudgetResource;
    exoticGases: BudgetResource;
    rareCrystals: BudgetResource;
    livingMetal: BudgetResource;
    zro: BudgetResource;
    darkMatter: BudgetResource;
    nanites: BudgetResource;
  };

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

    const getResourceOrDefault = (type: string): BudgetResource =>
      resources[type] || { items: [], amount: 0 };

    this.energy = getResourceOrDefault("energy");
    this.minerals = getResourceOrDefault("minerals");
    this.food = getResourceOrDefault("food");
    this.consumerGoods = getResourceOrDefault("consumer_goods");
    this.alloys = getResourceOrDefault("alloys");
    this.influence = getResourceOrDefault("influence");
    this.unity = getResourceOrDefault("unity");

    var physics = getResourceOrDefault("physics_research");
    var society = getResourceOrDefault("society_research");
    var engineering = getResourceOrDefault("engineering_research");

    this.research = {
      physics,
      society,
      engineering,
      total: engineering.total + physics.total + society.total
    };

    this.strategic = {
      volatileMotes: getResourceOrDefault("volatile_motes"),
      exoticGases: getResourceOrDefault("exotic_gases"),
      rareCrystals: getResourceOrDefault("rare_crystals"),
      livingMetal: getResourceOrDefault("sr_living_metal"),
      zro: getResourceOrDefault("sr_zro"),
      darkMatter: getResourceOrDefault("sr_dark_matter"),
      nanites: getResourceOrDefault("nanites")
    };
  }
}
