import { useMemo, useState } from "react";

import { RestMenuItem, RestMenuResponse } from "../types/RemoteMenus";

interface NavigationMenuProps {
  listClasses?: string,
  listItemClasses?: string,
  anchorClasses?: string,
  menuId?: string,
  remoteMenuId: number
}

export default function NavigationMenu(props: NavigationMenuProps) {
  // Set all our CSS Classes
  const listClasses = props.listClasses || 'nav justify-content-center';
  const listItemClasses = props.listItemClasses || 'nav-item';
  const anchorClasses = props.anchorClasses || 'nav-link';

  const menuId = props.menuId || 'remote-menu';
  const remoteMenuId = props.remoteMenuId;

  const [links, setLinks] = useState<Array<RestMenuItem>>([]);

  useMemo(() => {
    fetch(`https://www.ucf.edu/wp-json/ucf-rest-menus/v1/menus/${remoteMenuId}`)
      .then((responseJson) => responseJson.json())
      .then((response: RestMenuResponse) => {
        setLinks(response.items);
      });
  }, []);

  return (
    <ul id={menuId} className={listClasses}>
      {links.map((link: RestMenuItem) => {
        return (
        <li key={link.id} className={listItemClasses}>
          <a
            className={anchorClasses}
            href={link.url}>
              {link.title}
            </a>
        </li>
        );
      })}
    </ul>
  );
}
