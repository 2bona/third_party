import VueRouter from "vue-router";
// import store from "./store";

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "index" */ "./components/index.vue"),
      props: true,
      // meta: {
      //   requiresAuth: true,
      //   role: true
      // },
      children: [
        {
          name: "home",
          path: "",
          component: () =>
            import(/* webpackChunkName: "first" */ "./components/first.vue")
        },
        {
          path: "map",
          component: () =>
            import(/* webpackChunkName: "map" */ "./components/map.vue")
        }
      ]
    },
    {
      path: "/vendor/:name",
      props: true,
      component: () =>
        import(
          /* webpackChunkName: "vendorpage" */ "./components/vendorpage.vue"
        )
    },
    {
      path: "/cart",
      component: () =>
        import(/* webpackChunkName: "cart" */ "./components/cart.vue")
    },
    {
      path: "/userorder",
      props: true,
      component: () =>
        import(
          /* webpackChunkName: "userorder" */
          "./components/userorder.vue"
        )
    },
    {
      path: "/vendoritem/:category/:name",
      props: true,
      component: () =>
        import(
          /* webpackChunkName: "vendoritem" */
          "./components/vendoritem.vue"
        )
    },
    {
      path: "/user",
      component: () =>
        import(/* webpackChunkName: "profile" */ "./components/profile.vue")
      // meta: {
      //   requiresAuth: true,
      //   role: true
      // }
    },
    {
      path: "/selectaddress",
      component: () =>
        import(
          /* webpackChunkName: "selectAddress" */ "./components/selectAddress.vue"
        )
    },
    {
      path: "/ordersummary",
      component: () =>
        import(
          /* webpackChunkName: "ordersummary" */ "./components/ordersummary.vue"
        )
    },
    {
      path: "/paychoice",
      component: () =>
        import(/* webpackChunkName: "paychoice" */ "./components/paychoice.vue")
    },

    {
      path: "/usercity",
      name: "city",
      component: () =>
        import(/* webpackChunkName: "userCity" */ "./components/userCity.vue")
    },
    {
      path: "/userarea/:id/:name",
      component: () =>
        import(/* webpackChunkName: "userArea" */ "./components/userArea.vue")
    },
    {
      path: "/checkout",
      component: () =>
        import(/* webpackChunkName: "checkout" */ "./components/checkout.vue")
    },
    {
      //payment pages
      path: "/pay",
      component: () =>
        import(/* webpackChunkName: "pay" */ "./components/pay.vue"),
      props: true,
      children: [
        {
          path: "/",
          component: () =>
            import(/* webpackChunkName: "pay1" */ "./components/pay1.vue"),
          props: true
        },
        {
          path: "pin",
          component: () =>
            import(/* webpackChunkName: "pay2" */ "./components/pay2.vue"),
          props: true
        },
        {
          path: "success",
          component: () =>
            import(/* webpackChunkName: "pay3" */ "./components/pay3.vue"),
          props: true
        }
      ]
    },
    {
      path: "/category/:name",
      component: () =>
        import(/* webpackChunkName: "index" */ "./components/index.vue")
    },
    {
      path: "/search",
      component: () =>
        import(
          /* webpackChunkName: "searchcomp" */ "./components/searchcomp.vue"
        )
    },
    {
      path: "/address",
      component: () =>
        import(/* webpackChunkName: "address" */ "./components/address.vue")
    },
    {
      path: "/city",
      component: () =>
        import(/* webpackChunkName: "city" */ "./components/city.vue")
    },
    {
      path: "/area/:id/:name",
      props: true,
      component: () =>
        import(/* webpackChunkName: "area" */ "./components/area.vue")
    },
    {
      path: "/Regvendor",
      component: () =>
        import(
          /* webpackChunkName: "Register-vendor" */ "./components/Register-vendor.vue"
        )
      // meta: {
      //   role: true,
      //   requiresAuth: true
      // }
    },
    {
      path: "/Regagent",
      component: () =>
        import(
          /* webpackChunkName: "Register-Delivery-Agent" */ "./components/Register-Delivery-Agent.vue"
        )
    },
    {
      path: "/vendorforms",
      component: () =>
        import(
          /* webpackChunkName: "vendorform" */ "./components/vendorforms.vue"
        )
    },
    {
      path: "/vendorformedit",
      component: () =>
        import(
          /* webpackChunkName: "vendorformedit" */ "./components/vendorformsedit.vue"
        )
    },
    {
      path: "/vendortables",
      component: () =>
        import(
          /* webpackChunkName: "vendortable" */ "./components/vendortables.vue"
        )
    },
    {
      path: "/vendorsales",
      component: () =>
        import(
          /* webpackChunkName: "vendorsale" */ "./components/vendorsales.vue"
        )
    },
    {
      path: "/vendorreviews",
      component: () =>
        import(
          /* webpackChunkName: "vendorreview" */ "./components/vendorreviews.vue"
        )
    },
    {
      //vendor pages
      path: "/vendoradmin",
      component: () =>
        import(
          /* webpackChunkName: "vendoradmin" */ "./components/vendoradmin.vue"
        ),
      props: true,
      children: [
        {
          path: "/",
          component: () =>
            import(
              /* webpackChunkName: "items" */ "./components/admin/itemadmin.vue"
            ),
          props: true
        },
        {
          path: "items",
          component: () =>
            import(
              /* webpackChunkName: "items" */ "./components/admin/itemadmin.vue"
            ),
          props: true
        },
        {
          path: "item/:id",
          component: () =>
            import(
              /* webpackChunkName: "items" */ "./components/admin/details.vue"
            ),
          props: true
        },
        {
          path: "summary",
          component: () =>
            import(
              /* webpackChunkName: "summary" */ "./components/admin/summary.vue"
            ),
          props: true
        },
        {
          path: "adminorder",
          component: () =>
            import(
              /* webpackChunkName: "adminorder" */
              "./components/admin/adminorder.vue"
            ),
          props: true
        },
        {
          path: "orders",
          component: () =>
            import(
              /* webpackChunkName: "orders" */ "./components/admin/orders.vue"
            ),
          props: true
        },
        {
          path: "reviews",
          component: () =>
            import(
              /* webpackChunkName: "reviews" */ "./components/admin/reviews.vue"
            ),
          props: true
        },
        {
          path: "adminedit",
          component: () =>
            import(
              /* webpackChunkName: "adminedit" */ "./components/admin/adminedit.vue"
            ),
          props: true
        }
      ]
    },
    {
      //vendor pages
      path: "/delivery",
      component: () =>
        import(
          /* webpackChunkName: "deliveryadmin" */ "./components/deliveryadmin.vue"
        ),
      props: true,
      children: [
        {
          path: "/",
          component: () =>
            import(
              /* webpackChunkName: "items" */ "./components/delivery/orders.vue"
            ),
          props: true
        },
        {
          path: "adminorder",
          component: () =>
            import(
              /* webpackChunkName: "adminorder" */
              "./components/delivery/adminorder.vue"
            ),
          props: true
        },
        {
          path: "adminedit",
          component: () =>
            import(
              /* webpackChunkName: "adminedit" */ "./components/delivery/adminedit.vue"
            ),
          props: true
        }
      ]
    },
    {
      path: "/order",
      component: () =>
        import(/* webpackChunkName: "order" */ "./components/order.vue"),
      props: true,
      children: [
        {
          path: "/",
          component: () =>
            import(
              /* webpackChunkName: "status" */ "./components/orderstatus.vue"
            ),
          props: true
        },
        {
          path: "tracking",
          component: () =>
            import(
              /* webpackChunkName: "ordertracking" */ "./components/ordertracking.vue"
            ),
          props: true
        }
      ]
    },
    {
      path: "/vendor",
      component: () =>
        import(/* webpackChunkName: "vendor" */ "./components/vendor.vue")
    },
    {
      path: "/auth",
      component: () =>
        import(
          /* webpackChunkName: "authpage" */ "./components/auth/authpage.vue"
        ),
      //   beforeEnter: ifNotAuthenticated,
      children: [
        {
          path: "/",
          component: () =>
            import(
              /* webpackChunkName: "index" */ "./components/auth/authintro.vue"
            ),
          props: true
        },
        {
          path: "login",
          component: () =>
            import(
              /* webpackChunkName: "login" */ "./components/auth/login.vue"
            ),
          props: true,
          meta: {
            guest: true
          }
        },
        {
          path: "setpassword",
          component: () =>
            import(
              /* webpackChunkName: "setpassword" */ "./components/auth/setpassword.vue"
            ),
          props: true,
          meta: {
            guest: true
          }
        },
        {
          path: "passcode",
          component: () =>
            import(
              /* webpackChunkName: "passcode" */ "./components/auth/passcode.vue"
            ),
          props: true,
          meta: {
            guest: true
          }
        },
        {
          path: "resetpasscode",
          component: () =>
            import(
              /* webpackChunkName: "resetpasscode" */ "./components/auth/resetpasscode.vue"
            ),
          props: true,
          meta: {
            guest: true
          }
        },
        {
          path: "reset",
          component: () =>
            import(
              /* webpackChunkName: "reset" */ "./components/auth/reset.vue"
            ),
          props: true,
          meta: {
            guest: true
          }
        },
        {
          path: "resetpass",
          component: () =>
            import(
              /* webpackChunkName: "resetpass" */ "./components/auth/resetpass.vue"
            ),
          props: true,
          meta: {
            guest: true
          }
        },
        {
          path: "register",
          name: "reg",
          component: () =>
            import(
              /* webpackChunkName: "register" */ "./components/auth/register.vue"
            ),
          meta: {
            guest: true
          }
        },
        {
          path: "registerdata",
          name: "regdata",
          component: () =>
            import(
              /* webpackChunkName: "register" */ "./components/auth/registerdata.vue"
            ),
          meta: {
            guest: true
          }
        }
      ]
    },
    {
      path: "/components",
      component: () =>
        import(/* webpackChunkName: "home" */ "./components/home.vue"),
      props: true,
      meta: {
        guest: true
      }
    },

    {
      path: "/userview",
      name: "userview",
      component: () =>
        import(/* webpackChunkName: "index" */ "./components/index.vue"),
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "*",
      component: () =>
        import(/* webpackChunkName: "home" */ "./components/home.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("token") == null) {
      next({
        path: "/auth/login",
        query: {
          nextUrl: to.fullPath
        }
      });
    } else {
      let user = JSON.parse(localStorage.getItem("user"));
      let area = JSON.parse(localStorage.getItem("userarea"));
      if (to.matched.some(record => record.meta.role)) {
        if (user.role === "vendor" && area) {
          next();
        } else {
          next({
            name: "city"
          });
        }
        // else if (user.role === "vendor") {
        //   next({
        //     path: "/vendoradmin",
        //     query: {
        //       nextUrl: to.fullPath
        //     }
        //   });
        // }
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem("token") == null) {
      next();
    } else {
      next({
        name: "home"
      });
    }
  } else {
    next();
  }
});
export default router;
