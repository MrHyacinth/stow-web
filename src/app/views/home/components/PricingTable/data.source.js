import React from 'react';

export const Pricing20DataSource = {
  wrapper: { className: 'home-page-wrapper pricing2-wrapper' },
  page: { className: 'home-page pricing2' },
  OverPack: { playScale: 0.3, className: 'pricing2-content-wrapper' },
  titleWrapper: {
    className: 'pricing2-title-wrapper',
    children: [
      {
        name: 'title',
        children: (
          <>
            <p>
            <img className="inlineLogo" src="https://firebasestorage.googleapis.com/v0/b/stow-62251.appspot.com/o/web%2Fassets%2Fimg%2FlogoOutline.png?alt=media&token=7b54fd4e-ef58-4717-9c4b-2fb16a7f8bbf" alt="img" />
            <br />
             Payment Plans</p>
          </>
        ),
        className: 'homeH1',
      },
    ],
  },
  Table: {
    name: 'tabsTitle',
    size: 'default',
    className: 'pricing2-table ppFastTrack',
    columns: {
      children: [
        {
          dataIndex: 'pro',
          key: 'pro',
          name: 'pro',
          className: 'ppFastTrack',
          childWrapper: {
            className: 'pricing2-table-name-block',
            children: [
              {
                name: 'name',
                className: 'pricing2-table-name',
                children: (
                  <>
                    <p>Outright</p>
                  </>
                ),
              },
              {
                name: 'content',
                className: 'pricing2-table-money k7y8nz2hh7u-editor_css',
                children: (
                  <>
                    <p>6 months</p>
                  </>
                ),
              },
            ],
          },
        },
        {
          dataIndex: 'free',
          key: 'free',
          name: 'free',
          className: 'ppOutright',
          childWrapper: {
            className: 'pricing2-table-name-block',
            children: [
              {
                name: 'name',
                className: 'pricing2-table-name',
                children: (
                  <>
                    <p>Fast Track</p>
                  </>
                ),
              },
              {
                name: 'content',
                className: 'pricing2-table-money k7y8l5gguc-editor_css',
                children: (
                  <>
                    <p>12 months</p>
                  </>
                ),
              },
            ],
          },
        },
        {
          dataIndex: 'free~k7y8nox6vqk',
          key: 'free~k7y8nox6vqk',
          name: 'free~k7y8nox6vqk',
          className: 'ppFlexi24',
          childWrapper: {
            className: 'pricing2-table-name-block',
            children: [
              {
                name: 'name',
                className: 'pricing2-table-name',
                children: (
                  <>
                    <p>Flexi 24</p>
                  </>
                ),
              },
              {
                name: 'content',
                className: 'pricing2-table-money k7y8l5gguc-editor_css',
                children: (
                  <>
                    <p>24 months</p>
                  </>
                ),
              },
            ],
          },
        },
        {
          dataIndex: 'free~k7y8npyq8zp',
          key: 'free~k7y8npyq8zp',
          name: 'free~k7y8npyq8zp',
          className: 'ppFlexi36',
          childWrapper: {
            className: 'pricing2-table-name-block',
            children: [
              {
                name: 'name',
                className: 'pricing2-table-name',
                children: (
                  <>
                    <p>Flexi 36</p>
                  </>
                ),
              },
              {
                name: 'content',
                className: 'pricing2-table-money k7y8l5gguc-editor_css',
                children: (
                  <>
                    <p>36 months</p>
                  </>
                ),
              },
            ],
          },
        },
        {
          dataIndex: 'free~k7y8ns92f1d',
          key: 'free~k7y8ns92f1d',
          name: 'free~k7y8ns92f1d',
          className: 'ppFlexi48',
          childWrapper: {
            className: 'pricing2-table-name-block',
            children: [
              {
                name: 'name',
                className: 'pricing2-table-name',
                children: (
                  <>
                    <p>Flexi 48</p>
                  </>
                ),
              },
              {
                name: 'content',
                className: 'pricing2-table-money k7y8l5gguc-editor_css',
                children: (
                  <>
                    <p>48 months</p>
                  </>
                ),
              },
            ],
          },
        },
      ],
    },
    dataSource: {
      children: [
        {
          name: 'list0',
          children: [
            {
              children: '30% initial deposit to Octo5',
              name: 'content0',
              className: 'pricing2-table-content',
            },
            {
              name: 'content2',
              children: '30% initial deposit to Octo5',
              className: 'pricing2-table-content',
            },
            {
              name: 'content~k7y8nox6t1q',
              children: '10% surcharge applies',
              className: 'pricing2-table-content',
            },
            {
              name: 'content~k7y8npyrznc',
              children: '12.5% surcharge applies',
              className: 'pricing2-table-content',
            },
            {
              name: 'content~k7y8ns929wl',
              children: '15% surcharge applies',
              className: 'pricing2-table-content',
            },
          ],
         
        },
        {
          name: 'list1',
          children: [
            {
              children: '60% paid over 6 months',
              name: 'content0',
              className: 'pricing2-table-content',
            },
            {
              children: '60% paid over 12 months',
              name: 'content2',
              className: 'pricing2-table-content',
            },
            {
              children: '24 Months Payment Plan',
              name: 'content~k7y8nox6pe',
              className: 'pricing2-table-content',
            },
            {
              children: '36 Months Payment Plan',
              name: 'content~k7y8npyribp',
              className: 'pricing2-table-content',
            },
            {
              children: '48 Months Payment Plan',
              name: 'content~k7y8ns92hb',
              className: 'pricing2-table-content',
            },
          ],
        },
        {
          name: 'list2',
         children: [
            {
              name: 'content0',
              children: (
                <>
                  <p>Unit is handed over in the 9th month
                  </p>
                  <p>and client pays 10% balance</p>
                </>
              ),
              className: 'pricing2-table-content',
            },
            {
             
              children: (
                <>
                  <p>Unit is handed over in the 18th month
                  </p>
                  <p>and client pays 10% balance</p>
                </>
              ),
              name: 'content2',
              className: 'pricing2-table-content',
            },
            {
              children: '10% initial deposit to Octo5',
              name: 'content~k7y8nox699t',
              className: 'pricing2-table-content',
            },
            {
              children: '10% initial deposit to Octo5',
              name: 'content~k7y8npyry7g',
              className: 'pricing2-table-content',
            },
            {
              children: '10% initial deposit to Octo5',
              name: 'content~k7y8npyry7g',
              className: 'pricing2-table-content',
            },
          ],
        },
        {
          name: 'list3',
        
           children: [
            {
              name: 'content0',
              children: 'No surcharge',
              className: 'pricing2-table-content',
            },
            {
              name: 'content2',
              children: '5% surcharge applies',

              className: 'pricing2-table-content',
            },
            {
              name: 'content~k7y8nox6zgp',
              children: (
                <>
                  <p>Additional 60% deposit aggregated</p>
                  <p>between months 1-18</p>
                </>
              ),
              className: 'pricing2-table-content',
            },
            {
              name: 'content~k7y8npyrldt',
              children: (
                <>
                <p>Additional 30% deposit aggregated</p>
                <p>between months 1-12</p>
                </>
              ),
              className: 'pricing2-table-content',
            },
            {
              name: 'content~k7y8ns9257b',
              children: (
                <>
                <p>Additional 30% deposit aggregated</p>
                <p>between months 1-12</p>
                </>
              ),
              className: 'pricing2-table-content',
            },
          ],
        },
        {
          name: 'list4',
          children: [
            {
              name: 'content0',
              className: 'pricing2-table-content',
            },
            {
              name: 'content2',
              className: 'pricing2-table-content',
            },
            {
              name: 'content~k7y8nox6hto',
             children: (
                <>
                  <p>Unit is handed over in the 18th month
                  </p>
                </>
              ),
              className: 'pricing2-table-content',
            },
            {
              name: 'content~k7y8npyry1r',
              children: (
                <>
                <p>Further 30% aggregated</p>
                <p>between 13th-24th month</p>
                </>
              ),
              className: 'pricing2-table-content',
            },
            {
              name: 'content~k7y8ns921xb',

              children: (
                <>
                <p>Further 30% aggregated</p>
                <p>between 13th-36th month</p>
                </>
              ),
              className: 'pricing2-table-content',
            },
          ],
         
        },
        {
          name: 'list5',
          children: [
            {
              name: 'content0',
              className: 'pricing2-table-content',
            },
            {
              name: 'content2',

              className: 'pricing2-table-content',
            },
            {
              name: 'content~k7y8nox6zgp',
              children: (
                <>
                <p>30% balance is payable</p>
                  <p>between months 18-24</p>
                </>
              ),
              className: 'pricing2-table-content',
            },
            {
              name: 'content~k7y8npyrldt',
              children: (
                <>
                  <p>Unit is handed over in month 24
                  </p>
                </>
              ),
              
              className: 'pricing2-table-content',
            },
            {
              name: 'content~k7y8ns9257b',
               children: (
                <>
                  <p>Unit is handed over in the 36th month
                  </p>
                </>
              ),
              

              className: 'pricing2-table-content',
            },
          ],
        },
        {
          name: 'list6',
          children: [
            {
              name: 'content0',
              className: 'pricing2-table-content',
            },
            {
              name: 'content2',
              className: 'pricing2-table-content',
            },
            {
              name: 'content~k7y8nox6zgp',
              className: 'pricing2-table-content',
            },
            {
              name: 'content~k7y8npyrldt',
               children: (
                <>
                <p>Balance of 30% is payable</p>
                <p>between months 25-36</p>
                </>
              ),
              className: 'pricing2-table-content',
            },
            {
              name: 'content~k7y8ns9257b',
              children: (
                <>
                <p>30% balance is payable</p>
                <p>between months 37-48</p>
                </>
              ),
              className: 'pricing2-table-content',
            },
          ],
        },
        
      ],
    },
  },
};
