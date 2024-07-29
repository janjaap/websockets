'use client';

import { ApolloProvider } from '@apollo/client';

import CallsList from './callsList/page';
import { Sidebar } from './components/sidebar/Sidebar';
import { apolloClient } from './lib/apolloClient';
import css from './page.module.css';

export default function Index() {
  return (
    <ApolloProvider client={apolloClient}>
      <main className={css.page}>
        <header className={css.title}>
          <h1>Callcenter</h1>
        </header>
        <Sidebar />
        <section className={css.content}>
          <CallsList />
        </section>
      </main>
    </ApolloProvider>
  );
}
