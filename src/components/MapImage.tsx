import { useMap } from 'react-map-gl';

export interface MapIconProps {
    iconImageSource: string,
    iconName: string
}

export function MapIcon(props: MapIconProps) {
    const { current: map } = useMap();

    if (!map?.hasImage(props.iconName)) {
      map?.loadImage(props.iconImageSource, (err, img) => {
          if (err) throw err;
          if (!map.hasImage(props.iconName)) map.addImage(props.iconName, img!);
      });
    }

    return null;
}
