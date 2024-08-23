import { useMap } from 'react-map-gl';

export interface MapIconProps {
    iconImageSource: string,
    iconName: string
}

export function MapIcon(props: MapIconProps) {
    const { current: map } = useMap();

    const blankImage = new Image;
    blankImage.width = 1;
    blankImage.height = 1;

    if (!map?.hasImage(props.iconName)) {
      map?.addImage(props.iconName, blankImage);

      let img = new Image(60, 60);
      img.src = props.iconImageSource;

      img.onload = () => {
        map?.removeImage(props.iconName);
        map?.addImage(props.iconName, img!);
      };
    }

    return null;
}
