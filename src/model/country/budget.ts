import { Budget } from "../..";
import { asDictionary, asPairArray, asString, Pair } from "../../compile";
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
    const data = asDictionary(pairs);

    const currentMonth = asDictionary(data.current_month);

    const balance = asPairArray(currentMonth.balance)
      .map(x =>
        asPairArray(x.value).map(y => ({
          amount: parseFloat(asString(y.value)),
          resource: y.key as string,
          type: x.key as string
        }))
      )
      .reduce((a, b) => a.concat(b));

    const resources: { [key: string]: BudgetResource } = {};

    balance.forEach(({ type, resource, amount }) => {
      if (!resources[resource]) {
        resources[resource] = {
          items: [],
          total: 0
        };
      }

      resources[resource].items.push({
        amount,
        type
      });
      resources[resource].total += amount;
    });

    const empty = (): BudgetResource => ({ items: [], total: 0 });

    this.energy = resources.energy || empty();
    this.minerals = resources.minerals || empty();
    this.food = resources.food || empty();
    this.consumerGoods = resources.consumer_goods || empty();
    this.alloys = resources.alloys || empty();
    this.influence = resources.influence || empty();
    this.unity = resources.unity || empty();

    const physics = resources.physics_research || empty();
    const society = resources.society_research || empty();
    const engineering = resources.engineering_research || empty();

    this.research = {
      engineering,
      physics,
      society,
      total: engineering.total + physics.total + society.total
    };

    this.strategic = {
      darkMatter: resources.sr_dark_matter || empty(),
      exoticGases: resources.exotic_gases || empty(),
      livingMetal: resources.sr_living_metal || empty(),
      nanites: resources.nanites || empty(),
      rareCrystals: resources.rare_crystals || empty(),
      volatileMotes: resources.volatile_motes || empty(),
      zro: resources.sr_zro || empty()
    };
  }
}
