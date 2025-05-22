export const MENU_ITEMS = [{
  key: 'menu',
  label: 'Main',
  isTitle: true
}, {
  key: 'dashboard',
  icon: 'ri:dashboard-2-line',
  label: 'Dashboard',
  badge: {
    // text: '9+',
    variant: 'success'
  },
  url: '/dashboard'
}, {
  key: 'apps',
  label: 'App',
  isTitle: true
}, 
{
  key: 'apps-calendar',
  icon: 'ri:calendar-line',
  label: 'Add Account',
  url: '/apps/AddAccount'
}, 
// {
//   key: 'apps-calendar',
//   icon: 'ri:calendar-line',
//   label: 'Strategies',
//   url: '/apps/calendar'
// }, 
{
  key: 'apps-kanban',
  icon: 'ri:artboard-line',
  label: 'Futures',
  url: '/apps/kanban'
}, {
  key: 'apps-invoices',
  icon: 'ri:article-line',
  label: 'Open & Close Options',
  children: [{
    key: 'invoices-report',
    label: 'Open Options',
    url: '/apps/invoices/report',
    parentKey: 'apps-invoices'
  }, {
    key: 'invoice',
    label: 'Close Options',
    url: '/apps/invoices/invoiceId',
    parentKey: 'apps-invoices'
  }]
}

// , {
//   key: 'extra-pages',
//   label: 'Extra Pages',
//   isTitle: true
// }, {
//   key: 'pages',
//   label: 'Pages',
//   isTitle: false,
//   icon: 'ri:stack-line',
//   children: [{
//     key: 'page-starter',
//     label: 'Starter Page',
//     url: '/pages/starter',
//     parentKey: 'pages'
//   }, {
//     key: 'page-contact',
//     label: 'Contact List',
//     url: '/pages/contacts',
//     parentKey: 'pages'
//   }, {
//     key: 'page-profile',
//     label: 'Profile',
//     url: '/pages/profile',
//     parentKey: 'pages'
//   }, {
//     key: 'page-timeline',
//     label: 'Timeline',
//     url: '/pages/timeline',
//     parentKey: 'pages'
//   }, {
//     key: 'page-faqs',
//     label: 'FAQ',
//     url: '/pages/faqs',
//     parentKey: 'pages'
//   }, {
//     key: 'page-pricing',
//     label: 'Pricing',
//     url: '/pages/pricing',
//     parentKey: 'pages'
//   }, {
//     key: 'page-maintenance',
//     label: 'Maintenance',
//     url: '/maintenance',
//     parentKey: 'pages',
//     target: '_blank'
//   }, {
//     key: 'page-404-error',
//     label: 'Error 404',
//     url: '/error-404',
//     parentKey: 'pages',
//     target: '_blank'
//   }, {
//     key: 'page-error-404-alt',
//     label: 'Error 404 Alt',
//     url: '/pages/error-404-alt',
//     parentKey: 'pages'
//   }, {
//     key: 'page-500',
//     label: 'Error 500',
//     url: '/error-500',
//     parentKey: 'pages',
//     target: '_blank'
//   }]
// }, {
//   key: 'page-authentication',
//   label: 'Authentication',
//   isTitle: false,
//   icon: 'ri:account-circle-line',
//   children: [{
//     key: 'sign-in',
//     label: 'Login',
//     url: '/auth/login',
//     parentKey: 'page-authentication'
//   }, {
//     key: 'signup',
//     label: 'Register',
//     url: '/auth/register',
//     parentKey: 'page-authentication'
//   }, {
//     key: 'logout',
//     label: 'Logout',
//     url: '/auth/logout',
//     parentKey: 'page-authentication'
//   }, {
//     key: 'reset-pass',
//     label: 'Forgot Password',
//     url: '/auth/forgot-pass',
//     parentKey: 'page-authentication'
//   }, {
//     key: 'lock-screen',
//     label: 'Lock Screen',
//     url: '/auth/lock-screen',
//     parentKey: 'page-authentication'
//   }]
// }, {
//   key: 'components',
//   label: 'Components',
//   isTitle: true
// }, {
//   key: 'base-ui',
//   icon: 'ri:briefcase-line',
//   label: 'Base UI',
//   children: [{
//     key: 'base-ui-accordions',
//     label: 'Accordions',
//     url: '/ui/accordions',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-alerts',
//     label: 'Alerts',
//     url: '/ui/alerts',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-avatars',
//     label: 'Avatars',
//     url: '/ui/avatars',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-buttons',
//     label: 'Buttons',
//     url: '/ui/buttons',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-buttons-group',
//     label: 'Button group',
//     url: '/ui/button-group',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-badges',
//     label: 'Badges',
//     url: '/ui/badges',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-breadcrumb',
//     label: 'Breadcrumb',
//     url: '/ui/breadcrumb',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-cards',
//     label: 'Cards',
//     url: '/ui/cards',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-carousel',
//     label: 'Carousel',
//     url: '/ui/carousel',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-collapse',
//     label: 'Collapse',
//     url: '/ui/collapse',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-close-button',
//     label: 'Close Button',
//     url: '/ui/close-buttons',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-dropdowns',
//     label: 'Dropdowns',
//     url: '/ui/dropdowns',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-embed',
//     label: 'Embed Video',
//     url: '/ui/embed-video',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-grid',
//     label: 'Grid',
//     url: '/ui/grid',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-links',
//     label: 'Links',
//     url: '/ui/links',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-list-group',
//     label: 'List Group',
//     url: '/ui/list-group',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-modals',
//     label: 'Modals',
//     url: '/ui/modals',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-navbar',
//     label: 'Navbar',
//     url: '/ui/navbar',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-offcanvas',
//     label: 'Offcanvas',
//     url: '/ui/offcanvas',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-placeholders',
//     label: 'Placeholders',
//     url: '/ui/placeholders',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-pagination',
//     label: 'Pagination',
//     url: '/ui/pagination',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-popovers',
//     label: 'Popovers',
//     url: '/ui/popovers',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-progress',
//     label: 'Progress',
//     url: '/ui/progress',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-spinners',
//     label: 'Spinners',
//     url: '/ui/spinners',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-toasts',
//     label: 'Toasts',
//     url: '/ui/toasts',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-tabs',
//     label: 'Tabs',
//     url: '/ui/tabs',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-tooltips',
//     label: 'Tooltips',
//     url: '/ui/tooltips',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-typography',
//     label: 'Typography',
//     url: '/ui/typography',
//     parentKey: 'base-ui'
//   }, {
//     key: 'base-ui-utilities',
//     label: 'Utilities',
//     url: '/ui/utilities',
//     parentKey: 'base-ui'
//   }]
// }, {
//   key: 'extended-ui',
//   icon: 'ri:compass-3-line',
//   label: 'Extended UI',
//   children: [{
//     key: 'extended-ui-portlets',
//     label: 'Portlets',
//     url: '/extended/portlets',
//     parentKey: 'extended-ui'
//   }, {
//     key: 'extended-ui-scrollbar',
//     label: 'Scrollbar',
//     url: '/extended/scrollbar',
//     parentKey: 'extended-ui'
//   }, {
//     key: 'extended-ui-range',
//     label: 'Range Slider',
//     url: '/extended/range-slider',
//     parentKey: 'extended-ui'
//   }]
// }, {
//   key: 'icons',
//   icon: 'ri:contrast-drop-2-line',
//   label: 'Icons',
//   children: [{
//     key: 'icons-lucide',
//     label: 'Lucide Icons',
//     url: '/icons/lucide',
//     parentKey: 'icons'
//   }, {
//     key: 'icons-remix',
//     label: 'Remix Icons',
//     url: '/icons/remix',
//     parentKey: 'icons'
//   }, {
//     key: 'icons-bootstrap',
//     label: 'Bootstrap Icons',
//     url: '/icons/bs',
//     parentKey: 'icons'
//   }, {
//     key: 'icons-material',
//     label: 'Material Design Icons',
//     url: '/icons/mdi',
//     parentKey: 'icons'
//   }]
// }, {
//   key: 'charts',
//   icon: 'ri:pie-chart-2-line',
//   label: 'Charts',
//   children: [{
//     key: 'charts-apex',
//     label: 'Apex Charts',
//     url: '/charts/apex',
//     parentKey: 'charts'
//   }, {
//     key: 'charts-chartjs',
//     label: 'Chartjs',
//     url: '/charts/chartjs',
//     parentKey: 'charts'
//   }, {
//     key: 'charts-sparkline',
//     label: 'Sparkline Charts',
//     url: '/charts/sparkline',
//     parentKey: 'charts'
//   }]
// }, {
//   key: 'forms',
//   icon: 'ri:survey-line',
//   label: 'Forms',
//   children: [{
//     key: 'forms-basic-elements',
//     label: 'Basic Elements',
//     url: '/forms/basic',
//     parentKey: 'forms'
//   }, {
//     key: 'forms-advanced',
//     label: 'Form Advanced',
//     url: '/forms/advanced',
//     parentKey: 'forms'
//   }, {
//     key: 'forms-validation',
//     label: 'Validation',
//     url: '/forms/validation',
//     parentKey: 'forms'
//   }, {
//     key: 'forms-wizard',
//     label: 'Wizard',
//     url: '/forms/wizard',
//     parentKey: 'forms'
//   }, {
//     key: 'forms-file-uploads',
//     label: 'File Uploads',
//     url: '/forms/file-uploads',
//     parentKey: 'forms'
//   }, {
//     key: 'forms-editors',
//     label: 'Form Editors',
//     url: '/forms/editors',
//     parentKey: 'forms'
//   }, {
//     key: 'forms-image-crop',
//     label: 'Image Crop',
//     url: '/forms/image-crop',
//     parentKey: 'forms'
//   }, {
//     key: 'forms-x-editable',
//     label: 'X Editable',
//     url: '/forms/editable',
//     parentKey: 'forms'
//   }]
// }, {
//   key: 'tables',
//   icon: 'ri:table-line',
//   label: 'Tables',
//   children: [{
//     key: 'tables-basic',
//     label: 'Basic Tables',
//     url: '/tables/basic',
//     parentKey: 'tables'
//   }, {
//     key: 'tables-data',
//     label: 'Data Tables',
//     url: '/tables/data-table',
//     parentKey: 'tables'
//   }, {
//     key: 'tables-responsive',
//     label: 'Responsive Table',
//     url: '/tables/responsive-table',
//     parentKey: 'tables'
//   }]
// }, {
//   key: 'maps',
//   icon: 'ri:map-pin-line',
//   label: 'Maps',
//   children: [{
//     key: 'maps-google',
//     label: 'Google Maps',
//     url: '/maps/google',
//     parentKey: 'maps'
//   }, {
//     key: 'maps-vector',
//     label: 'Vector Maps',
//     url: '/maps/vector',
//     parentKey: 'maps'
//   }]
// }, {
//   key: 'menuitem',
//   icon: 'ri:share-line',
//   label: 'Multi Level',
//   children: [{
//     key: 'menu-item-1',
//     label: 'Level 1.1',
//     parentKey: 'menuitem'
//   }, {
//     key: 'menu-item-2',
//     label: 'Level 1.2',
//     parentKey: 'menuitem',
//     children: [{
//       key: 'menu-sub-item',
//       label: 'Item 1',
//       parentKey: 'menu-item-2'
//     }, {
//       key: 'menu-sub-item-2',
//       label: 'Item 2',
//       parentKey: 'menu-item-3'
//     }]
//   }, {
//     key: 'menu-item-1-2',
//     label: 'Level 1.3',
//     parentKey: 'menuitem'
//   }]


// }


];