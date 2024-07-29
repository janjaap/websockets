'use client';

import { ApolloProvider } from '@apollo/client';
import { NewCall } from './components/newCall/NewCall';

import CallsList from './callsList/page';
import { apolloClient } from './lib/apolloClient';
import css from './page.module.css';

export default function Index() {
  return (
    <ApolloProvider client={apolloClient}>
      <main className={css.page}>
        <header className={css.title}>
          <h1>Callcenter</h1>
        </header>
        <aside className={css.sidebar}>
          <NewCall onError={console.error} />
        </aside>
        <section className={css.content}>
          <CallsList />
        </section>
      </main>
    </ApolloProvider>
  );
}
