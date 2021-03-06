import React, { useContext } from 'react';
import Link from 'components/Topic/Link';

import TopicFormContext from './TopicFormContext'

const LinkContainer = ({ id }) => {
  const { getLink, deleteLink, deleteTag, addTag } = useContext(TopicFormContext);

  const {url, title, tags} = getLink(id);

  return <Link
    isEdit={true}
    title={title}
    url={url}
    onDelete={() => deleteLink(url)}
    tags={tags}
    onTagDelete={(tag) => deleteTag(id, tag)}
    onTagAdd={(tag) => addTag(id, tag)}
  />
}

export default LinkContainer;
