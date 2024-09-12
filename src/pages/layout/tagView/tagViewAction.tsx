import type { FC } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllTag, removeOtherTag, removeTag } from '@/stores/tags-view.store';

const TagsViewAction: FC = () => {
  const { activeTagId } = useSelector(state => state.tagsView);
  const dispatch = useDispatch();

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: '0',
            onClick: () => dispatch(removeTag(activeTagId)),
            label: 'Close Current',
          },
          {
            key: '1',
            onClick: () => dispatch(removeOtherTag()),
            label:'Close Other',
          },
          {
            key: '2',
            onClick: () => dispatch(removeAllTag()),
            label: 'Close All',
          },
          {
            key: '3',
            type: 'divider',
          },
          {
            key: '4',
            onClick: () => dispatch(removeOtherTag()),
            label: "Dashboard",
          },
        ],
      }}
    >
      <span id="pageTabs-actions">
        <SettingOutlined className="tagsView-extra" />
      </span>
    </Dropdown>
  );
};

export default TagsViewAction;
