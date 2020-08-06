export const paymentPlans = [
  {
    title: 'Outright',
    details: [
      '30% initial deposit  to Octo5',
      '60% paid over 6 months',
      'Unit is handed over in the 9th month and client pays 10% balance',
      'No surcharge',
    ],
    breakdown: [30,30,30,10],
  },
  {
    title: 'Fast Track',
    details: [
      '30% initial deposit  to Octo5',
      '60% payable over 12 months',
      'Unit is handed over in the 18th month and client pays 10% balance',
      '5% surcharge applies',
    ],
    breakdown: [30,20,40,10],
  },
  {
    title: 'Flexi 24',
    details: [
      '10% surcharge applies',
      '24 Months Payment Plan',
      '10% initial deposit to Octo5',
      'Additional 60% deposit aggregated between months 1-18',
      'Unit is handed over in month 18',
      '30% balance outstanding is payable between months 18-24',
    ],
    breakdown: [10,20,40,30],
  },
  {
    title: 'Flexi 36',
    details: [
      '12.5% surcharge applies',
      '36 Months Payment Plan',
      '10% initial deposit to Octo5',
      'Additional 30% deposit aggregated between months 1-12',
      'Further 30% aggregated between 13th-24th month',
      'Unit is handed over in month 24',
      'Balance of 30% is payable between months 25-36',
    ],
    breakdown: [10,20,40,30],
  },
  {
    title: 'Flexi 48',
    details: [
      '15% surcharge applies',
      '48 Months Payment Plan',
      '10% initial deposit to Octo5',
      'Additional 30% deposit aggregated between months 1-12',
      'Further 30% aggregated between 13th-36th month',
      'Unit is handed over in month 36',
      'Balance of 30% is payable between months 37-48',
    ],
    breakdown: [10,20,40,30],
  },
  // {
  //   title: 'Mortgage Plan',
  //   details: [
  //     'Find a plan that works for you',
  //     'Customized to your needs',
  //   ],
  //   breakdown: [10,20,10,60],
  // },
];