import * as React from 'react';
import useSWR from 'swr'
import { getBookmarks } from '~/data/bookmarks'
import Page, { SectionHeading } from '~/components/Page';
import { H3 } from '~/components/Typography'
import { Bookmark } from '~/types'
import BookmarksList from '~/components/Bookmarks'

interface Props {
  bookmarks?: Array<Bookmark>
}

function Bookmarks(props: Props) {
  const initialData = props.bookmarks
  const { data: bookmarks } = useSWR('/api/bookmarks/get', getBookmarks, { initialData })

  return (
    <Page withHeader>
      <SectionHeading data-cy="bookmarks">
        <H3>Bookmarks</H3>
        <BookmarksList bookmarks={bookmarks} />
      </SectionHeading>
    </Page>
  );
}

export async function getStaticProps() {
  const bookmarks = await getBookmarks()
  return { props: { bookmarks }}
}

export default Bookmarks