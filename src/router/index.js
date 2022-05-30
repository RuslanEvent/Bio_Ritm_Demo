import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Admin from "../views/AdminPage.vue";
import EditUsers from "../views/EditUsers.vue";
import Reception from "../views/Reception.vue";
import AddClients from "../views/AddClients.vue";
import SelectService from "../views/SelectService.vue";
import Patient from "../views/Patient.vue";
import Client from "../views/Client.vue";
import Doctor from "../views/Doctor.vue";
import Analistic from "../views/Analistic.vue"
import AddDoctors from "../views/AddDoctors.vue";
import Process from "../views/Process.vue";
import Services from "../views/Services.vue";
import Laboratory1 from "../views/Laboratory1.vue";
import Laboratory2 from "../views/Laboratory2.vue";
import Analis from "../views/Analis.vue";
import auth from "../middlewares/auth";
import role from "../middlewares/role";
import store from "../store";
import middlewarePipeline from './middlewarePipeline'

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      middleware: [
        auth,
        role('admin')
      ]
    },
    children: [
      {
        path: 'client',
        component: Client,
        name: 'Client',
        meta: {
          middleware: [
            auth,
            role('admin')
          ]
        },
      },
      {
        path: 'doctor',
        name: "Doctor",
        component: Doctor,
        meta: {
          middleware: [
            auth,
            role('admin')
          ]
        },
      },
      {
        path: "addDoctors",
        name: "AddDoctors",
        component: AddDoctors,
        meta: {
          middleware: [
            auth,
            role('admin')
          ]
        }
      },
      {
        path: "analistic",
        name: "Analistic",
        component: Analistic,
        meta: {
          middleware: [
            auth,
            role('admin')
          ]
        }
      },
      {
        path: 'process',
        name: 'Process',
        component: Process,
        meta: {
          middleware: [
            auth,
            role(['laboratory1', 'admin', 'laboratory2'])
          ]
        },
      },
      {
        path: 'services',
        component: Services,
        meta: {
          middleware: [
            auth,
            role('admin')
          ]
        },
      },
      {
        path: 'editUsers',
        name: "EditUsers",
        component: EditUsers,
        meta: {
          middleware: [
            auth,
            role('admin')
          ]
        },

      },
    ]
  },

  {
    path: "/reception",
    name: "Reception",
    component: Reception,
    meta: {
      middleware: [
        auth,
        role('reception')
      ]
    },
    children: [
      {
        path: 'addClients',
        name: "AddClients",
        component: AddClients,
        meta: {
          middleware: [
            auth,
            role(['reception', 'admin'])
          ]
        },
      },
      {
        path: 'selectService',
        name: "SelectService",
        component: SelectService,
        meta: {
          middleware: [
            auth,
            role(['reception', 'admin'])
          ]
        },
      },
      {
        path: 'patient',
        name: "Patient",
        component: Patient,
        meta: {
          middleware: [
            auth,
            role(['reception', 'admin'])
          ]
        },
      },
    ]
  },
  {
    path: '/analis/:id',
    name: "Analis",
    component: Analis,
    meta: {
      middleware: [
        auth,
        role(['laboratory1', 'admin', 'laboratory2'])
      ]
    },
  },
  {
    path: "/laboratory1",
    name: "laboratory1",
    component: Laboratory1,
    meta: {
      middleware: [
        auth,
        role('laboratory1')
      ]
    },
  },
  {
    path: "/laboratory2",
    name: "laboratory2",
    component: Laboratory2,
    meta: {
      middleware: [
        auth,
        role('laboratory2')
      ]
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to, from, next, store
  }
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router;
