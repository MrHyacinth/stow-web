import React from 'react';
import firebase from "firebase";

export const Nav30DataSource = {
  wrapper: { className: 'header3 home-page-wrapper' },
  page: { className: 'home-page' },
  logo: {
    className: 'header3-logo k7xntlf4e6o-editor_css',
    children:
      'https://firebasestorage.googleapis.com/v0/b/stow-62251.appspot.com/o/web%2Fassets%2Fimg%2Flogo.png?alt=media&token=59a65820-c5bb-4fb1-9ac2-fc712c983203',
  },
  Menu: {
    className: 'header3-menu',
    children: [
      // {
      //   name: 'item0',
      //   className: 'header3-item',
      //   children: {
      //     href: '#',
      //     children: [
      //       {
      //         children: (
      //           <>
      //             <p>Home</p>
      //           </>
      //         ),
      //         name: 'text',
      //       },
      //     ],
      //   },
      // },
      {
        name: 'item2',
        className: 'header3-item',
        children: {
          href: '#about',
          children: [
            {
              children: (
                <>
                  <p>About Us</p>
                </>
              ),
              name: 'text',
            },
          ],
        },
      },
      {
        name: 'item3',
        className: 'header3-item',
        children: {
          href: '#residential-segment',
          children: [
            {
              children: (
                <>
                  <p>Residential Segments</p>
                </>
              ),
              name: 'text',
            },
          ],
        },
      },
      {
        name: 'item~k7xnvc4e9g',
        className: 'header3-item',
        children: {
          href: '#payment-plans',
          children: [
            {
              children: (
                <>
                  <p>Payment Plans</p>
                </>
              ),
              name: 'text',
            },
          ],
        },
      },
      {
        name: 'nav~faq',
        className: 'header3-item',
        children: {
          href: '#faq',
          children: [
            {
              children: (
                <>
                  <p>FAQ</p>
                </>
              ),
              name: 'text',
            },
          ],
        },
      },
       {
        name: 'item~k7xnvcz7rid',
        className: 'header3-item',
        children: {
          href: 'https:\/\/www.octo5.co\/contact-us\/',
          children: [
            {
              children: (
                <>
                  <p>Contact Us</p>
                </>
              ),
              name: 'text',
            },
          ],
        },
      },
      {
        name: 'item~k7xnvdoyelk',
        className: 'header3-item k7xnysmi67-editor_css',
        children: {
          href: firebase.auth().currentUser ? '\/dashboard' : '\/signin',
          children: [
            {
              children: (
                <>
                  <p>
                    <b>{firebase.auth().currentUser ? 'My Account' : 'Login'}</b>
                  </p>
                </>
              ),
              name: 'text',
              className: 'k7xo10xf2c-editor_css',
            },
          ],
        },
      },
    ],
  },

  mobileMenu: { className: 'header3-mobile-menu' },
};