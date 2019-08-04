## Model

| Status   | Property                    | Description                          |
| -------- | --------------------------- | ------------------------------------ |
|          | alliance                    |                                      |
|          | ambient_object              |                                      |
|          | archaeological_sites        |                                      |
|          | army                        |                                      |
| Partial  | bypasses                    |                                      |
|          | clusters                    |                                      |
| Complete | country                     | Dictionary of countries              |
| Complete | date                        | In-game date                         |
|          | debris                      |                                      |
|          | deposit                     |                                      |
|          | fired_events                |                                      |
|          | flags                       |                                      |
| Complete | fleet                       |                                      |
|          | fleet_template              |                                      |
| Complete | galactic_object             | Dictionary of star systems           |
|          | galaxy                      |                                      |
|          | galaxy_radius               |                                      |
|          | global_ship_design          |                                      |
|          | ground_combat               |                                      |
|          | half_species                |                                      |
|          | last_created_ambient_object |                                      |
|          | last_created_army           |                                      |
|          | last_created_country        |                                      |
|          | last_created_design         |                                      |
|          | last_created_fleet          |                                      |
|          | last_created_leader         |                                      |
|          | last_created_pop            |                                      |
|          | last_created_pop_faction    |                                      |
|          | last_created_ship           |                                      |
|          | last_created_species        |                                      |
|          | last_created_system         |                                      |
|          | last_diplo_action_id        |                                      |
|          | last_event_id               |                                      |
|          | last_killed_country_name    |                                      |
|          | last_notification_id        |                                      |
|          | last_refugee_country        |                                      |
| Complete | leaders                     |                                      |
|          | market                      |                                      |
|          | megastructures              |                                      |
|          | message                     |                                      |
|          | missile                     |                                      |
| Complete | name                        | Name shown when opening the savefile |
|          | name_list                   |                                      |
| Complete | natural_wormholes           |                                      |
|          | nebula                      |                                      |
| Complete | planets                     | List of planets                      |
| Complete | player                      | List of human players                |
|          | player_event                |                                      |
| Complete | pop                         | List of pops                         |
| Complete | pop_factions                | List of factions                     |
|          | random_count                |                                      |
|          | random_log_day              |                                      |
|          | random_name_database        |                                      |
|          | random_seed                 |                                      |
| Complete | required_dlcs               | List of required DLCs                |
|          | rim_galactic_objects        |                                      |
|          | saved_event_target          |                                      |
|          | sectors                     |                                      |
|          | ship_design                 |                                      |
| Complete | ships                       |                                      |
|          | slave_market_manager        |                                      |
| Complete | species                     |                                      |
| Complete | starbases                   |                                      |
|          | strike_craft                |                                      |
|          | tick                        |                                      |
|          | trade_deal                  |                                      |
|          | trade_routes                |                                      |
|          | trade_routes_manager        |                                      |
|          | truce                       |                                      |
|          | used_color                  |                                      |
|          | used_species_names          |                                      |
|          | used_species_portrait       |                                      |
|          | used_symbols                |                                      |
| Complete | version                     |                                      |
|          | version_control_revision    | Version in number form               |
|          | war                         |                                      |

## Country

| Status   | Property                      | Description                         |
| -------- | ----------------------------- | ----------------------------------- |
|          | active_policies               |                                     |
|          | adjective                     |                                     |
|          | advisor_voice_type            |                                     |
|          | ai                            |                                     |
|          | alliance                      |                                     |
|          | ascension_perks               |                                     |
|          | associated_alliance           |                                     |
|          | auto_ship_designs             |                                     |
|          | branch_office_planets         |                                     |
|          | budget                        |                                     |
|          | built_species                 |                                     |
|          | capital                       |                                     |
|          | city_graphical_culture        |                                     |
|          | color_index                   |                                     |
|          | control_groups                |                                     |
| Complete | controlled_planets            |                                     |
|          | custom_name                   |                                     |
|          | customization                 |                                     |
|          | democratic_election           |                                     |
|          | economy_power                 |                                     |
|          | edicts                        |                                     |
|          | ethos                         |                                     |
|          | emigration                    |                                     |
|          | empire_cohesion               |                                     |
|          | empire_size                   |                                     |
|          | employable_pops               |                                     |
|          | events                        |                                     |
|          | faction                       | Unknown (not a list of faction ids) |
| Complete | flag                          |                                     |
|          | flags                         |                                     |
| Complete | fleet_size                    |                                     |
|          | fleet_template_manager        |                                     |
|          | given_value                   |                                     |
|          | government                    |                                     |
|          | government_date               |                                     |
|          | graphical_culture             |                                     |
|          | has_advisor                   |                                     |
|          | highest_intel_level           |                                     |
|          | hyperlane_systems             |                                     |
|          | immigration                   |                                     |
|          | initialized                   |                                     |
|          | intel                         |                                     |
|          | intel_level                   |                                     |
|          | is_affected_by_war_exhaustion |                                     |
|          | last_activated_relic          |                                     |
|          | last_alliance_name            |                                     |
|          | last_changed_country_type     |                                     |
|          | last_date_at_war              |                                     |
|          | last_date_war_lost            |                                     |
|          | last_date_was_human           |                                     |
|          | location                      |                                     |
|          | military_power                |                                     |
|          | modules                       |                                     |
| Complete | name                          | Name                                |
|          | name_list                     |                                     |
|          | neighbor_rivals               |                                     |
|          | new_colonies                  |                                     |
|          | next_election                 |                                     |
|          | next_transport_fleet_number   |                                     |
|          | num_upgraded_starbase         |                                     |
|          | overlord                      |                                     |
|          | owned_armies                  |                                     |
|          | owned_fleets                  |                                     |
| Ignored  | owned_leaders                 | (linked via Leader)                 |
|          | owned_megastructures          |                                     |
| Complete | owned_planets                 |                                     |
|          | personality                   |                                     |
|          | policy_flags                  |                                     |
|          | random_name_variables         |                                     |
|          | regnal_numbers                |                                     |
|          | rejected_actions              |                                     |
|          | relations_manager             |                                     |
|          | relics                        |                                     |
|          | restricted_systems            |                                     |
|          | room                          |                                     |
|          | ruler                         |                                     |
|          | ruler_title                   |                                     |
|          | ruler_title_female            |                                     |
|          | sapient                       |                                     |
| Ignored  | saved_leaders                 | (linked via Leader)                 |
|          | sectors                       |                                     |
|          | seen_bypass_types             |                                     |
|          | sensor_range_fleets           |                                     |
|          | ship_design                   |                                     |
|          | ship_names                    |                                     |
|          | ship_prefix                   |                                     |
|          | shown_message_types           |                                     |
|          | species_index                 |                                     |
|          | starbase_capacity             |                                     |
|          | starting_system               |                                     |
|          | subject_date                  |                                     |
|          | subject_type                  |                                     |
|          | subjects                      |                                     |
|          | surveyed                      |                                     |
|          | tech_power                    |                                     |
|          | tech_status                   |                                     |
|          | terra_incognita               |                                     |
|          | timed_modifier                |                                     |
|          | traditions                    |                                     |
|          | type                          |                                     |
|          | usable_bypasses               |                                     |
|          | variables                     |                                     |
|          | visited_objects               |                                     |
|          | victory_rank                  |                                     |
|          | victory_score                 |                                     |
|          | war_allies                    |                                     |

## Country -> Flag

| Status   | Property   | Description |
| -------- | ---------- | ----------- |
| Complete | background |             |
| Complete | colors     |             |
| Complete | icon       |             |

## Faction

| Status   | Property         | Description               |
| -------- | ---------------- | ------------------------- |
| Complete | country          |                           |
| Complete | faction_approval |                           |
| Complete | leader           |                           |
| Ignored  | members          | (linked via Pop)          |
| Complete | name             |                           |
| Ignored  | parameters       | (only has the country id) |
| Complete | support          |                           |
| Complete | type             |                           |

## Fleet

| Status   | Property                 | Description |
| -------- | ------------------------ | ----------- |
|          | action_initialized       |             |
|          | actions                  |             |
|          | aggro_range              |             |
|          | aggro_range_measure_from |             |
|          | auto_movement            |             |
| Complete | civilian                 |             |
|          | combat                   |             |
|          | current_order            |             |
|          | flags                    |             |
|          | fleet_stance             |             |
|          | fleet_stats              |             |
|          | fleet_template           |             |
|          | friends_should_follow    |             |
|          | ground_support_stance    |             |
|          | has_custom_name          |             |
|          | hit_points               |             |
|          | incoming_merges          |             |
|          | mia                      |             |
|          | mia_from                 |             |
|          | mia_type                 |             |
| Complete | military_power           |             |
|          | missile                  |             |
|          | mission                  |             |
|          | movement_manager         |             |
| Complete | name                     |             |
|          | order                    |             |
|          | order_id                 |             |
| Complete | owner                    |             |
|          | previous_owner           |             |
|          | return_date              |             |
|          | settings                 |             |
|          | ships                    |             |
| Complete | station                  |             |

## Leader

| Status   | Property           | Description          |
| -------- | ------------------ | -------------------- |
| Complete | age                |                      |
| Complete | agenda             |                      |
| Complete | class              |                      |
| Complete | country            |                      |
| Partial  | creator            |                      |
|          | date               |                      |
|          | date_added         |                      |
|          | event_leader       |                      |
|          | experience         |                      |
|          | flags              |                      |
| Complete | gender             |                      |
|          | immortal           |                      |
|          | leader_terms       |                      |
| Complete | level              |                      |
|          | location           |                      |
|          | mandate            |                      |
| Complete | name               |                      |
| Ignored  | pop_faction        | (linked via Faction) |
|          | portrait           |                      |
|          | pre_ruler_class    |                      |
|          | pre_ruler_location |                      |
|          | roles              |                      |
| Complete | species_index      |                      |

## Planet

| Status   | Property                  | Description                             |
| -------- | ------------------------- | --------------------------------------- |
| Complete | amenities                 | The amount of amenities produced        |
| Complete | amenities_usage           | The amount of amenities used            |
|          | anomaly                   | Unknown (string)                        |
|          | army                      | List of army ids                        |
|          | army_build_queue_item     | Unknown (complex)                       |
|          | assembling_species        | Unknown (number)                        |
|          | auto_slots_taken          | Unknown (list of yes/no)                |
|          | automated_development     | Whether automated development is active |
|          | bombardment_damage        |                                         |
|          | branch_office_building    |                                         |
|          | branch_office_owner       |                                         |
|          | build_queue_item          |                                         |
|          | building                  |                                         |
|          | built_armies              |                                         |
| Complete | colonize_date             | Date planet was colonized               |
| Complete | controller                | Controlling country id                  |
| Complete | coordinate                | Position in system as well as system id |
| Complete | crime                     | The amount of crime                     |
|          | custom_name               |                                         |
|          | decline                   |                                         |
|          | declining_pop             |                                         |
|          | declining_species         |                                         |
|          | delayed_event             |                                         |
|          | deposits                  |                                         |
|          | disabled                  |                                         |
|          | disabled_branch_office    |                                         |
|          | district                  |                                         |
|          | employable_pops           |                                         |
|          | entity                    |                                         |
|          | entity_name               |                                         |
|          | entity_planet_class       |                                         |
|          | explicit_entity           |                                         |
|          | favorite_jobs             |                                         |
|          | final_designation         |                                         |
|          | flags                     |                                         |
|          | free_amenities            |                                         |
|          | free_housing              |                                         |
|          | ground_support_stance     |                                         |
|          | growth                    |                                         |
|          | growth_species            |                                         |
|          | has_ring                  |                                         |
|          | housing_usage             |                                         |
|          | is_moon                   |                                         |
|          | is_terraformed            |                                         |
|          | is_under_colonization     |                                         |
|          | job_priority              |                                         |
|          | jobs_cache                |                                         |
|          | kill_pop                  |                                         |
|          | last_bombardment          |                                         |
|          | last_building_changed     |                                         |
|          | last_district_changed     |                                         |
|          | migration                 |                                         |
|          | moon_of                   |                                         |
|          | moons                     |                                         |
| Complete | name                      |                                         |
|          | next_build_item_id        |                                         |
|          | num_sapient_pops          |                                         |
|          | orbit                     |                                         |
|          | orbital_bombardment       |                                         |
|          | orbitals                  |                                         |
|          | original_owner            | Original owning country id              |
| Copmlete | owner                     | Owning country id                       |
|          | picture                   |                                         |
| Complete | planet_class              | Planet type                             |
|          | planet_class_changed      |                                         |
|          | planet_modifier           |                                         |
| Complete | planet_size               | Planet size                             |
|          | pop                       | List of pop ids                         |
|          | pop_assembly              |                                         |
|          | prevent_anomaly           |                                         |
|          | ruined                    |                                         |
|          | ruined_branch_office      |                                         |
|          | shipclass_orbital_station |                                         |
| Complete | stability                 | Amount of stability                     |
|          | surveyed                  |                                         |
|          | surveyed_by               |                                         |
|          | terraformed_by            |                                         |
|          | timed_modifier            |                                         |
|          | total_housing             |                                         |
|          | variables                 |                                         |

## Player

| Status   | Property | Description |
| -------- | -------- | ----------- |
| Complete | name     | Username    |
| Complete | country  | Country id  |

## Pop

| Status   | Property                 | Description                                     |
| -------- | ------------------------ | ----------------------------------------------- |
| Complete | amenities_usage          | Amenities usage                                 |
|          | can_migrate              |                                                 |
| Complete | category                 | Employment category (worker, specialist, ruler) |
| Complete | crime                    | Crime level                                     |
| Complete | ethos                    | Ethic                                           |
|          | flags                    |                                                 |
|          | force_faction_evaluation |                                                 |
| Complete | happiness                | Happiness                                       |
| Complete | housing_usage            |                                                 |
| Complete | job                      | Job                                             |
| Complete | planet                   | Planet id                                       |
| Complete | pop_faction              | Faction id                                      |
| Complete | power                    | Political power                                 |
|          | promotion_date           |                                                 |
| Complete | species_index            | Species                                         |

## Ship

| Status   | Property             | Description |
| -------- | -------------------- | ----------- |
|          | armor_hitpoints      |             |
|          | army                 |             |
|          | aura_modifier        |             |
|          | auras                |             |
|          | combat_action        |             |
|          | coordinate           |             |
|          | created_this_update  |             |
|          | design_upgrade       |             |
|          | disable_at_health    |             |
|          | disabled             |             |
|          | disabled_by_event    |             |
|          | enable_at_health     |             |
| Complete | experience           |             |
|          | flags                |             |
| Complete | fleet                |             |
|          | formation_pos        |             |
|          | forward_x            |             |
|          | forward_y            |             |
|          | graphical_culture    |             |
|          | hitpoints            |             |
|          | homepop              |             |
|          | is_being_repaired    |             |
|          | key                  |             |
|          | kill_target          |             |
|          | last_damage          |             |
|          | leader               |             |
|          | max_armor_hitpoints  |             |
|          | max_hitpoints        |             |
|          | max_shield_hitpoints |             |
| Complete | name                 |             |
|          | next_weapon_index    |             |
|          | post_move_angle      |             |
|          | reserve              |             |
|          | rotation             |             |
|          | section              |             |
|          | shield_hitpoints     |             |
|          | ship_design          |             |
|          | ship_modifier        |             |
|          | speed                |             |
|          | target_coordinate    |             |
|          | targeting            |             |
|          | upgradable           |             |
|          | upgrade_progress     |             |

## Species

| Status   | Property    | Description |
| -------- | ----------- | ----------- |
| Complete | adjective   |             |
| Partial  | base        |             |
| Complete | class       |             |
|          | flags       |             |
| Complete | home_planet |             |
| Complete | name        |             |
|          | name_data   |             |
|          | name_list   |             |
| Complete | plural      |             |
| Complete | portrait    |             |
| Complete | sapient     |             |
| Complete | traits      |             |

## Starbase

| Status   | Property                    | Description |
| -------- | --------------------------- | ----------- |
| Complete | level                       |             |
| Complete | modules                     |             |
| Complete | buildings                   |             |
|          | next_build_item_id          |             |
|          | next_shipyard_build_item_id |             |
|          | ship_design                 |             |
|          | station                     |             |
| Complete | system                      |             |
| Complete | owner                       |             |
|          | shipyard_build_queue_item   |             |
|          | build_queue_item            |             |

## System

| Status   | Property               | Description                                              |
| -------- | ---------------------- | -------------------------------------------------------- |
|          | ambient_object         | List of ambient object ids                               |
|          | arm                    | Unknown (boolean)                                        |
|          | asteroid_belts         | List of asteroid belts                                   |
|          | aura_presence          | Unknown (list of ids)                                    |
|          | bypasses               | List of bypass ids                                       |
|          | claims                 | List of claims on this system                            |
| Complete | coordinate             | Position on the galactic map                             |
|          | discovery              | Unknown (list of ids)                                    |
|          | flags                  | Unknown (complex)                                        |
|          | fleet_presence         | List of fleet ids                                        |
|          | ftl_inhibitor_presence | List of ids                                              |
| Complete | hyperlane              | List of hyperlanes                                       |
|          | init_parent            | Unknown (id)                                             |
|          | initializer            | Name of system initializer                               |
|          | inner_radius           | Unknown (number)                                         |
|          | megastructures         | List of megastructure ids                                |
| Complete | name                   | The system's name                                        |
|          | natural_wormholes      | List of wormhole ids                                     |
|          | outer_radius           | Unknown (number)                                         |
|          | planet                 | Primary star id?                                         |
|          | sector                 | Sector id                                                |
| Complete | star_class             | The system's star class                                  |
| Complete | starbase               | Starbase id                                              |
|          | trade_collection       | Unknown (complex)                                        |
|          | trade_hub              | Amount and source of trade value collected in the system |
|          | trade_piracy           | Unknown (complex)                                        |
| Complete | type                   | The systems's type                                       |
