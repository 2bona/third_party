import VueRouter from "vue-router";
// import store from "./store";

const router = new VueRouter({
  // mode: "history",
  routes: [
    {
      path: "/Regvendor",
      component: () =>
        import(
          /* webpackChunkName: "Register-vendor" */ "./components/Register-vendor.vue"
        )
      // meta: {
      //   requiresAuth: true
      // }
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
      path: "/offlinepage",
      component: () =>
        import(
          /* webpackChunkName: "offlinepage" */
          "./components/offlinepage.vue"
        )
    },
    {
      path: "/offlineorders",
      component: () =>
        import(
          /* webpackChunkName: "offlineorders" */
          "./components/offlineorders.vue"
        )
    },
    {
      path: "/offlinepage/:id",
      props: true,
      component: () =>
        import(
          /* webpackChunkName: "offlinepage" */
          "./components/offlinepage.vue"
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
      path: "/",
      component: () =>
        import(
          /* webpackChunkName: "vendoradmin" */ "./components/vendoradmin.vue"
        ),
      meta: {
        requiresAuth: true,
        role: true
      },
      props: true,
      children: [
        {
          path: "",
          meta: {
            requiresAuth: true,
            role: true
          },
          component: () =>
            import(
              /* webpackChunkName: "items" */ "./components/admin/itemadmin.vue"
            ),
          props: true
        },
        {
          path: "item/:id",
          meta: {
            requiresAuth: true
          },
          component: () =>
            import(
              /* webpackChunkName: "items" */ "./components/admin/details.vue"
            ),
          props: true
        },
        {
          path: "summary",
          meta: {
            requiresAuth: true
          },
          component: () =>
            import(
              /* webpackChunkName: "summary" */ "./components/admin/summary.vue"
            ),
          props: true
        },
        {
          path: "godorders",
          meta: {
            requiresAuth: true
          },
          component: () =>
            import(
              /* webpackChunkName: "adminorder" */
              "./components/admin/adminorders.vue"
            ),
          props: true
        },
        {
          path: "adminorder",
          meta: {
            requiresAuth: true
          },
          component: () =>
            import(
              /* webpackChunkName: "adminorder" */
              "./components/admin/adminorder.vue"
            ),
          props: true
        },
        {
          path: "orders",
          meta: {
            requiresAuth: true
          },
          component: () =>
            import(
              /* webpackChunkName: "orders" */ "./components/admin/orders.vue"
            ),
          props: true
        },
        {
          path: "adminuser",
          meta: {
            requiresAuth: true
          },
          component: () =>
            import(
              /* webpackChunkName: "reviews" */ "./components/godview.vue"
            ),
          props: true
        },
        {
          path: "reviews",
          meta: {
            requiresAuth: true
          },
          component: () =>
            import(
              /* webpackChunkName: "reviews" */ "./components/admin/reviews.vue"
            ),
          props: true
        },
        {
          path: "adminedit",
          meta: {
            requiresAuth: true,
            role: true
          },
          component: () =>
            import(
              /* webpackChunkName: "adminedit" */ "./components/admin/adminedit.vue"
            ),
          props: true
        }
      ]
    },
    {
      path: "/auth",
      meta: {
        guest: true
      },
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
      path: "*",
      name: "404",
      component: () =>
        import(
          /* webpackChunkName: "vendoradmin" */ "./components/vendoradmin.vue"
        )
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("token") == null) {
      next({
        path: "/auth",
        query: {
          nextUrl: to.fullPath
        }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.role)) {
    if (localStorage.getItem("vendor")) {
      next();
    } else {
      localStorage.removeItem("token");
      next({
        path: "/Regvendor"
      });
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem("token") == null) {
      next();
    } else {
      next({
        path: "/"
      });
    }
  } else {
    next();
  }
});
export default router;
