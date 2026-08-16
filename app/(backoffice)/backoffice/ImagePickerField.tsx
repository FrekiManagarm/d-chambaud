import { Info } from "lucide-react";

import type { Media } from "@/payload-types";

export type MediaRelationship = number | Media | null | undefined;

export const mediaRelationshipId = (value: MediaRelationship) =>
  typeof value === "number" ? value : (value?.id ?? null);

type ImagePickerFieldProps = {
  currentValue?: MediaRelationship;
  help?: string;
  label: string;
  media: Media[];
  name: string;
};

export function ImagePickerField({
  currentValue,
  help,
  label,
  media,
  name,
}: ImagePickerFieldProps) {
  const currentId = mediaRelationshipId(currentValue);

  return (
    <label className="bo-form-field">
      <span>{label}</span>
      <select defaultValue={currentId ? String(currentId) : ""} name={name}>
        <option value="">— Image par défaut du site —</option>
        {media.map((item) => (
          <option key={item.id} value={item.id}>
            {item.alt}
            {item.filename ? ` (${item.filename})` : ""}
          </option>
        ))}
      </select>
      <p className="bo-help">
        <Info aria-hidden="true" size={14} />
        <span>
          {help ?? "Choisissez une image déjà présente dans la médiathèque."}
        </span>
      </p>
    </label>
  );
}
