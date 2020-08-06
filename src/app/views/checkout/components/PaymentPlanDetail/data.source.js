import React from 'react';

export const Pricing10DataSource = {
  wrapper: { className: 'home-page-wrapper pricing1-wrapper' },
  page: { className: 'home-page pricing1' },
  OverPack: { playScale: 0, className: 'pricing1-content-wrapper' },
  titleWrapper: {
    className: 'pricing1-title-wrapper',
    children: [
      {
        name: 'title',
        children: (
          <span>
            <p>Payment Plans</p>
          </span>
        ),
        className: 'pricing1-title-h1',
      },
    ],
  },
  block: {
    className: 'pricing1-block-wrapper',
    children: [
      {
        name: 'block1',
        className: 'pricing1-block',
        md: 24,
        xs: 24,
        children: {
          wrapper: { className: 'pricing1-block-box active' },
          topWrapper: { className: 'pricing1-top-wrapper' },
          name: { className: 'pricing1-name', children: 'Starter' },
          money: { className: 'pricing1-money', children: '¥199' },
          content: {
            className: 'pricing1-content',
            children: (
              <span>
                STOW
              </span>
            ),
          },
          line: { className: 'pricing1-line' },
          buttonWrapper: {
            className: 'pricing1-button-wrapper',
            children: {
              a: {
                className: 'pricing1-button',
                href: '#',
                children: '立即购买',
              },
            },
          },
        },
      },
    ],
  },
};
