import VueRouter from "vue-router";

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "list" */ "./components/list.vue"),
      props: true
    },
    {
      path: "/category/:name",
      component: () =>
        import(/* webpackChunkName: "list" */ "./components/list.vue")
    },
    {
      path: "/search",
      component: () =>
        import(
          /* webpackChunkName: "searchcomp" */ "./components/searchcomp.vue"
        )
    },
    {
      path: "/Regvendor",
      component: () =>
        import(
          /* webpackChunkName: "Register-vendor" */ "./components/Register-vendor.vue"
        )
    },
    {
      path: "/Regagent",
      component: () =>
        import(
          /* webpackChunkName: "Register-Delivery-Agent" */ "./components/Register-Delivery-Agent.vue"
        )
    },
    {
      path: "/vendoradmin",
      component: () =>
        import(
          /* webpackChunkName: "vendoradmin" */ "./components/vendoradmin.vue"
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
      path: "/user",
      component: () =>
        import(/* webpackChunkName: "profile" */ "./components/profile.vue")
    },
    {
      path: "/item",
      component: () =>
        import(/* webpackChunkName: "item" */ "./components/item.vue")
    },
    {
      path: "/cart",
      component: () =>
        import(/* webpackChunkName: "cart" */ "./components/cart.vue")
    },
    {
      path: "/checkout",
      component: () =>
        import(/* webpackChunkName: "checkout" */ "./components/checkout.vue")
    },
    {
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
        import(/* webpackChunkName: "authpage" */ "./components/authpage.vue"),
      props: true,
      //   beforeEnter: ifNotAuthenticated,
      children: [
        {
          path: "/",
          component: () =>
            import(/* webpackChunkName: "list" */ "./components/authintro.vue"),
          props: true
        },
        {
          path: "login",
          component: () =>
            import(/* webpackChunkName: "login" */ "./components/login.vue"),
          props: true,
          meta: {
            guest: true
          }
        },
        {
          path: "reset",
          component: () =>
            import(/* webpackChunkName: "reset" */ "./components/reset.vue"),
          props: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "resetpass",
          component: () =>
            import(
              /* webpackChunkName: "resetpass" */ "./components/resetpass.vue"
            ),
          props: true
        },
        {
          path: "register",
          component: () =>
            import(
              /* webpackChunkName: "register" */ "./components/register.vue"
            ),
          props: true
        }
      ]
    },
    {
      path: "/auth/login/:redirect",
      component: () =>
        import(/* webpackChunkName: "userauth" */ "./components/userauth.vue"),
      props: true
    },

    {
      path: "/reset",
      component: () =>
        import(/* webpackChunkName: "list" */ "./components/list.vue"),
      props: true
    },
    {
      path: "/register",
      component: () =>
        import(/* webpackChunkName: "register" */ "./components/register.vue"),
      props: true
    },

    {
      path: "/auth/reset",
      component: () =>
        import(/* webpackChunkName: "userauth" */ "./components/userauth.vue"),
      props: true
    },
    {
      path: "/auth/:action",
      component: () =>
        import(/* webpackChunkName: "userauth" */ "./components/userauth.vue"),
      props: true
    },
    {
      path: "/admin",
      component: () =>
        import(/* webpackChunkName: "list" */ "./components/list.vue"),
      props: true,
      meta: {
        requiresAuth: true,
        role: true
      }
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
        import(/* webpackChunkName: "list" */ "./components/list.vue"),
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
    if (localStorage.getItem("user-token") == null) {
      next({
        path: "/auth/login",
        params: {
          nextUrl: to.fullPath
        }
      });
    } else {
      let user = JSON.parse(localStorage.getItem("user"));
      if (to.matched.some(record => record.meta.role)) {
        if (user.role === "admin") {
          next();
        } else {
          next({
            name: "userview"
          });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem("user-token") == null) {
      next();
    } else {
      next({
        name: "userview"
      });
    }
  } else {
    next();
  }
});
export default router;
