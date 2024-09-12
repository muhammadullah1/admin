import type { FC } from 'react';
// import { useCallback, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation,  } from 'react-router-dom';
// import { Breadcrumb } from 'antd';
// import { addTag, setActiveTag } from '@/stores/tags-view.store';
// import type { Tag } from '@/interface/layout/tagsView.interface';

const TagsView: FC = () => {
  // const { tags, activeTagId } = useSelector(state => state.tagsView);
  // const { menuList } = useSelector(state => state.user);
  // const dispatch = useDispatch();
  // const location = useLocation();


  // const setCurrentTag = useCallback(
  //   (id?: string) => {
  //     const tag = tags.find(item => {
  //       if (id) {
  //         return item.path === id;
  //       } else {
  //         return item.path === location.pathname;
  //       }
  //     });

  //     if (tag) {
  //       dispatch(setActiveTag(tag.path));
  //     }
  //   },
  //   [dispatch, location.pathname, tags],
  // );

  // useEffect(() => {
  //   if (menuList.length) {
  //     const menu = menuList.find(m => m.path === location.pathname);

  //     if (menu) {
  //       dispatch(
  //         addTag({
  //           ...menu,
  //           closable: menu.code !== 'dashboard',
  //         }),
  //       );
  //     }
  //   }
  // }, [dispatch, location.pathname, menuList]);

  // const getCurrentTagAndChildren = (tags: Tag[], activeTagId: string) => {
  //   const currentTag = tags.find(tag => tag.path === activeTagId);
  //   if (!currentTag) return [];
  
  //   const childTags = tags.filter(tag => tag.path.startsWith(currentTag.path) && tag !== currentTag);
  //   return [currentTag, ...childTags];
  // };


  return (
    <div id="pageTabs" style={{ padding: '0px 0px' }}>

      {/* below code is use for bradcrump */}
      {/* <Breadcrumb>
        {getCurrentTagAndChildren(tags, activeTagId).map((tag, index) => (
          <Breadcrumb.Item
            key={tag.path}
            onClick={() => setCurrentTag(tag.path)}
          >
            {tag.label}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb> */}
    </div>
  );
};

export default TagsView;