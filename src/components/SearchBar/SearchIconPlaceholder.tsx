import { components } from "react-select";
import type { PlaceholderProps } from "react-select";
import { Search } from "lucide-react";
import type { CityOption } from "../../types/cities";

export default function SearchIconPlaceholder(
  props: PlaceholderProps<CityOption, false> //
) {
  return (
    <components.Placeholder {...props}>
      <Search
        size={16}
        style={{
          marginRight: 8,
          color: "rgba(255,255,255,0.7)",
          position: "relative",
          top: "3px",
        }}
      />
      {props.children}
    </components.Placeholder>
  );
}
