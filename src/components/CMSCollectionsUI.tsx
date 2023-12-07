import React from 'react';
import { BodyText, HeaderBold } from './UI';

export type CMSCollectionFieldProps = {
  name: string;
  value: string;
};

export type CMSCollectionProps = {
  collection_name: string;
  fields: Array<CMSCollectionFieldProps>;
};

type TProps = {
  collections: CMSCollectionProps[];
  value: CMSCollectionProps[];
  onSelect: (field: CMSCollectionFieldProps, collection_name: string) => void;
};

export const CMSCollectionsUI: React.FC<TProps> = ({ collections, onSelect, value }) => {
  const checkIfFieldIsSelected = (
    field: CMSCollectionFieldProps,
    collection_name: string,
  ) => {
    const selectedField = value?.find(
      (item) =>
        item.collection_name === collection_name &&
        item.fields.find((f) => f.value === field.value),
    );
    return selectedField ? true : false;
  };

  return (
    <div className="border-[1px] border-TypographyLight rounded-[12px] grid grid-cols-2 items-start">
      {collections.map((collection, index) => (
        <>
          {/* Collection Name */}
          <div
            className={`p-[14px] flex flex-row gap-4 items-center ${
              index !== 0 && 'border-t-[1px] border-TypographyLight'
            }`}
          >
            <img src="images/collection.svg" />
            <HeaderBold
              content={`${collection.collection_name} (${collection.fields.length})`}
              lgSize="lg:text-bodySm"
              mdSize="md:text-bodySm"
              color="text-TypographyDark"
            />
          </div>
          {/* Collection Fields */}
          <div
            className={`${
              index !== 0 && 'border-t-[1px]'
            } border-l-[1px] border-TypographyLight}`}
          >
            {collection.fields.map((field) => (
              <div className="p-[14px] flex flex-row gap-4 items-center justify-between">
                <BodyText
                  content={field.name}
                  xlSize="xl:text-bodySm"
                  lgSize="lg:text-bodySm"
                  mdSize="md:text-bodySm"
                  color="text-TypographyDark"
                  mediumFont
                />
                {/* Checkbox */}
                <div
                  onClick={() => onSelect(field, collection.collection_name)}
                  className={`min-w-[20px] w-[20px] h-[20px] flex items-center justify-center rounded-[4px] cursor-pointer ${
                    checkIfFieldIsSelected(field, collection.collection_name)
                      ? 'bg-Primary'
                      : 'bg-TypographyLight'
                  }`}
                >
                  {checkIfFieldIsSelected(field, collection.collection_name) && (
                    <img src="images/check.svg" alt="check" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  );
};
