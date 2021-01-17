<template>
  <v-container>
    <v-layout text-center wrap align-center justify-center column fill-height>
      <v-flex col-12>
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Karta Kredytowa
        </h1>
        <h2 class="headline font-weight-bold mb-3">Description</h2>
        <p class="subheading font-weight-regular">
          It's a simple application, which can parse credit card statement from
          mBank and spending analysis.
          <br >
          Test data are in folder
          <code>./modules/api/tests/fixtures/</code>
        </p>
      </v-flex>

      <v-flex col-12>
        <h2 class="headline font-weight-bold mb-3">Usefull command</h2>
        <code>
          ./dev start <br >
          ./dev stop <br >
          ./dev logs <br >
          ./dev logs &#60;app/db&#62; <br >
          ./dev reset <br >
          ./dev restart <br >
          ./dev ps <br >
          ./dev yarn knex <br >
          ./dev yarn test <br >
        </code>
      </v-flex>
      <v-flex col-12 class="justify-center" justify-center>
        <h2 class="headline font-weight-bold mb-3">Technical description</h2>
        <p>
          The project contains two modules, backend and frontend. Code is in one
          repository (monorepo).
        </p>
        <p>
          Backend is using <a href="https://hapi.dev/">hapi.js</a>. To
          communicate with data base we are using
          <a href="http://knexjs.org/"> knex</a> (as query builder) and
          <a href="https://vincit.github.io/objection.js/">objection.js</a> (ORM
          for knex).
          <br >
        </p>
        <p align="center">
          Code is divided into few parts:
          <v-list width="550" class="justify-center">
            <v-list-item>readers - for communication with database (searching, paginations etc.),</v-list-item>
            <v-list-item>services - for create, update and delete data,</v-list-item>
            <v-list-item>tests - for tests (jest.js framework),</v-list-item>
            <v-list-item>frontend - for frontend things  (vue.js).</v-list-item>
          </v-list>
        </p>
      </v-flex>
      <v-flex col-12>
        <h2 class="headline font-weight-bold mb-3">Programming Environment</h2>
        <p>Operation system: Ubuntu 18.04 LTS</p>
        <p align="center" fluid>
          Software:
          <v-list v-list width="650">
            <v-list-item>docker >= 19.03.5</v-list-item>
            <v-list-item>docker-compose >= 1.21.2</v-list-item>
            <v-list-item>node.js</v-list-item>
            <v-list-item>VSCode</v-list-item>
            <v-list-item>Optional software for connecting to DB, if you won't use PSQL(dbeaver, pgmodeler)</v-list-item>
          </v-list>
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader'
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify'
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify'
      }
    ],
    importantLinks: [
      {
        text: 'Documentation',
        href: 'https://vuetifyjs.com'
      },
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com'
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify'
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs'
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify'
      }
    ],
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com/components/api-explorer'
      },
      {
        text: 'Select a layout',
        href: 'https://vuetifyjs.com/layout/pre-defined'
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions'
      }
    ]
  })
}
</script>
