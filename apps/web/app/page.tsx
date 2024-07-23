'use client';

import { ApolloProvider } from '@apollo/client';
import { CallList } from './components/callList/CallList';

import { client } from './lib/client';
import css from './page.module.css';
import Sidebar from './sidebar/page';

export default function Index() {
  return (
    <ApolloProvider client={client}>
      <main className={css.page}>
        <section className={css.content}>
          <header>
            <h1>Callcenter</h1>
          </header>
          <CallList />
        </section>
        <aside className={css.sidebar}>
          <Sidebar />
        </aside>
      </main>
    </ApolloProvider>
  );
}
