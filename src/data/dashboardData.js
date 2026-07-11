export function getDashboardMetrics(workbook){

if(!workbook){

return [

{
title:"Total Records",
value:"—",
icon:"journal-bookmark",
accent:"accent-blue"
},

{
title:"Invoiced",
value:"—",
icon:"cash-coin",
accent:"accent-teal"
},

{
title:"Uninvoiced",
value:"—",
icon:"receipt",
accent:"accent-violet"
}

]

}

return [

{
title:"Total Records",
value:workbook.totalRecords,
icon:"journal-bookmark",
accent:"accent-blue"
},

{
title:"Invoiced",
value:workbook.invoiced,
icon:"cash-coin",
accent:"accent-teal"
},

{
title:"Uninvoiced",
value:workbook.uninvoiced,
icon:"receipt",
accent:"accent-violet"
}

]
]

export const trendSeries = [42, 68, 61, 79, 92, 88, 104]

export const routePerformance = [
  { route: 'SEA → LAX', demand: 'High', load: '92%', margin: '+12.4%' },
  { route: 'JFK → MIA', demand: 'Peak', load: '88%', margin: '+9.8%' },
  { route: 'ORD → DEN', demand: 'Steady', load: '81%', margin: '+6.2%' },
  { route: 'SFO → HNL', demand: 'High', load: '95%', margin: '+14.1%' },
]

export const alerts = [
  'Gate staffing balanced for the evening wave',
  'Weather advisory monitored for Midwest departures',
  'Loyalty upgrade offers are outperforming plan',
]

export const forecastMarkets = [
  { market: 'Austin', demand: '24%', growth: 'Expanding' },
  { market: 'Denver', demand: '19%', growth: 'Stable' },
  { market: 'Toronto', demand: '17%', growth: 'Rising' },
  { market: 'Miami', demand: '15%', growth: 'Peak' },
]
