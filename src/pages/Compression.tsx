import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  BodyText,
  Button,
  Dropdown,
  Header,
  HeaderBold,
  HelpTag,
  Input,
} from '../components/UI';
import { useLocation, useNavigate } from 'react-router-dom';
import { Folder, Info } from '../components/svg-components';
import {
  CMSCollectionFieldProps,
  CMSCollectionProps,
  CMSCollectionsUI,
} from '../components/CMSCollectionsUI';
import { ConversionCard } from '../components/ConversionCard';
import { EstimationModal } from '../components/EstimationModal';

const Compression = () => {
  const { state } = useLocation();
  const [step, setStep] = useState(state?.step || 1);
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<
    'API' | 'Webflow' | 'Connections' | null
  >(null);

  const [apiKey, setApiKey] = useState('');
  const [apiKeyInputIconColor, setApiKeyInputIconColor] = useState('');
  const [errorText, setErrorText] = useState({
    apiKey: '',
  });

  const [position, setPosition] = useState('absolute');
  const ref: any = useRef(null);

  const [dropdownIconColor, setDropdownIconColor] = useState('');
  const [selectedConnection, setSelectedConnection] = useState<any>(
    state?.selectedConnection || null,
  );

  const [isWebflowConnected, setIsWebflowConnected] = useState(false);
  const [webflowConnections, setWebflowConnections] = useState<any>([]);

  const [savedConnections, setSavedConnections] = useState<any>([]);

  const [conversionType, setConversionType] = useState<'webp' | 'basic'>('webp');
  const [cmsCollections, setCmsCollections] = useState<Array<CMSCollectionProps>>([]);
  const [selectedFields, setSelectedFields] = useState<Array<CMSCollectionProps>>([]);
  const [isEstimationModalVisible, setIsEstimationModalVisible] = useState(false);

  const handleModeSelection = (mode: 'API' | 'Webflow' | 'Connections') => {
    setSelectedMode(mode);
    //Reset states only when other mode is selected and not when same mode is clicked
    if (mode !== selectedMode) {
      resetStates();
    }
  };

  const handlePosition = () => {
    if (ref.current && ref.current.clientHeight < ref.current.scrollHeight) {
      setPosition('relative');
    } else {
      setPosition('absolute');
    }
  };

  const resetStates = () => {
    setSelectedConnection(null);
    setDropdownIconColor('');
    setApiKey('');
    setApiKeyInputIconColor('');
    setErrorText({
      apiKey: '',
    });
  };

  const handleConnectionUsingAPIKey = () => {
    //Call API here that will verify the API and if success
    if (true) {
      //Set connection
      setSelectedConnection({ label: 'Noon - Make it awesome', value: 'id' });
      handleConfigureConnection();
    } else {
      setErrorText({ ...errorText, apiKey: 'Invalid API' });
      setApiKeyInputIconColor('red');
    }
  };

  const authorizeWebflow = () => {
    //Do authorization and on success
    if (true) {
      //Set webflow connections
      setWebflowConnections([{ label: 'Noon - Make it awesome', value: 'id' }]);
      setIsWebflowConnected(true);
    }
  };

  const handleConfigureConnection = () => {
    //navigate to configure with selected connection
    setStep(2);

    //Get CMS collections of selected connection from API
    //on success
    let data = [
      {
        collection_name: 'Authors',
        fields: [
          { name: 'Bio', value: 'bio' },
          { name: 'Picture', value: 'picture' },
        ],
      },
      {
        collection_name: 'Blog Categories',
        fields: [
          { name: 'Icon', value: 'icon' },
          { name: 'Main Image', value: 'main_image' },
          { name: 'Hero Image', value: 'hero_image' },
        ],
      },
    ];
    setCmsCollections(JSON.parse(JSON.stringify(data)));
    setSelectedFields(JSON.parse(JSON.stringify(data)));
  };

  const handleStepBack = () => {
    setStep(1);
    setConversionType('webp');
    setTimeout(() => {
      handlePosition();
    }, 100);
  };

  const handleCMSCollectionsToConvert = (
    field: CMSCollectionFieldProps,
    collection_name: string,
  ) => {
    setSelectedFields((prevData) => {
      // Find the index of the collection_name in the state
      const index = prevData?.findIndex(
        (item) => item.collection_name === collection_name,
      );
      if (index !== -1) {
        // If collection_name exists, remove the field if it exists, or add it
        const updatedData = [...prevData];
        const fieldIndex = updatedData[index].fields.findIndex(
          (item) => item.value === field.value,
        );

        if (fieldIndex !== -1) {
          // If field exists, remove it
          updatedData[index].fields.splice(fieldIndex, 1);
          //If all fields are removed, remove the collection
          if (updatedData[index].fields.length === 0) {
            updatedData.splice(index, 1);
          }
        } else {
          // If field doesn't exist, add it
          updatedData[index].fields.push({ name: field.name, value: field.value });
        }

        return updatedData;
      } else {
        // If collection_name doesn't exist, add a new object
        return [
          ...prevData,
          {
            collection_name: collection_name,
            fields: [{ name: field.name, value: field.value }],
          },
        ];
      }
    });
  };

  const handleSelectOrDeselectAll = () => {
    if (doAllFieldsMatch()) {
      setSelectedFields([]);
    } else {
      setSelectedFields(JSON.parse(JSON.stringify(cmsCollections)));
    }
  };

  const doAllFieldsMatch = () => {
    for (const item1 of cmsCollections) {
      const matchingItem2 = selectedFields.find(
        (item2) => item2.collection_name === item1.collection_name,
      );

      if (!matchingItem2 || !fieldsMatch(item1.fields, matchingItem2.fields)) {
        return false;
      }
    }
    return true;
  };

  const fieldsMatch = (
    fields1: Array<CMSCollectionFieldProps>,
    fields2: Array<CMSCollectionFieldProps>,
  ) => {
    return fields1.every((field1) =>
      fields2.some(
        (field2) => field2.name === field1.name && field2.value === field1.value,
      ),
    );
  };

  const displayEstimation = () => {
    //Call api and if success
    setIsEstimationModalVisible(true);
  };

  //Call recent/saved connections API
  useEffect(() => {
    //Call api and if success
    if (true) {
      setSavedConnections([
        { label: 'Noon - Make it awesome', tag: '1', value: 'id' },
        { label: 'Adelfox - Engage your audience', tag: '2', value: 'id2' },
        { label: 'Botly - Your Webflow Partner', tag: '2', value: 'id3' },
        { label: 'ThunderClap', tag: '2', value: 'id4' },
      ]);
    }
  }, []);

  //Below positions the action div according to overflow
  useLayoutEffect(() => {
    handlePosition();
    window.addEventListener('resize', handlePosition);

    return () => {
      window.removeEventListener('resize', handlePosition);
    };
  }, [selectedMode, step]);

  //Set dropdown icon color
  useEffect(() => {
    if (selectedConnection) {
      setDropdownIconColor('#4519E8');
    } else {
      setDropdownIconColor('');
    }
    console.log(selectedConnection);
  }, [selectedConnection]);

  return step === 1 ? (
    <div className="flex flex-row min-h-screen max-h-screen">
      <div className="relative flex basis-1/2 px-[72px] py-[10vh] pb-[3vh] bg-gradient-to-r from-darkBlue from-0.01% to-veryDarkBlue to-99.99% overflow-hidden">
        <div className="relative flex flex-col justify-between max-w-[740px] mx-auto">
          <div className="flex flex-row gap-5 items-center">
            <div className="flex flex-row gap-[8px] items-center">
              <div className="bg-Primary rounded-[40px] w-[40px] h-[40px] flex justify-center items-center">
                <HeaderBold
                  content="1"
                  lgSize="lg:text-bodyMd"
                  mdSize="md:text-bodyMd"
                  smSize="sm:text-bodyMd"
                />
              </div>
              <BodyText
                content={'Select website'}
                xlSize="xl:text-bodyMd"
                lgSize="lg:text-bodyMd"
                mediumFont
              />
            </div>
            <div className="h-[1.5px] bg-Secondary rounded-[15px] w-[15%] opacity-25"></div>
            <div className="flex flex-row gap-[8px] items-center">
              <div className="bg-[#FFFFFF26] rounded-[40px] w-[40px] h-[40px] flex justify-center items-center">
                <HeaderBold
                  content="2"
                  lgSize="lg:text-bodyMd"
                  mdSize="md:text-bodyMd"
                  smSize="sm:text-bodyMd"
                />
              </div>
              <BodyText
                content={'Configure'}
                xlSize="xl:text-bodyMd"
                lgSize="lg:text-bodyMd"
                mediumFont
              />
            </div>
          </div>
          <div className="mt-[5vh]">
            <Header content={`Choose your preferred mode to begin.`} />
          </div>
          <div className="mt-[3vh]">
            <BodyText
              content="Begin by choosing the website you wish to optimize."
              opacity="opacity-70"
            />
          </div>
          <div className="flex flex-row mt-auto">
            <img src="images/octopus.svg" />
            <div className="-ml-10 mt-5">
              <HelpTag
                text="Don't know how to begin?"
                link="#"
                linkText="Read our guide"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="relative basis-1/2 overflow-y-auto" ref={ref}>
        <div className="px-[72px] py-[10vh] pb-[16vh] max-w-[740px] mx-auto">
          <div
            onClick={() => handleModeSelection('API')}
            className={`border-[1px] ${
              selectedMode === 'API'
                ? 'border-Primary bg-[#4519E80A]'
                : 'border-TypographyLight bg-white'
            } p-[24px] rounded-[12px] flex flex-row gap-5 items-center justify-between cursor-pointer mb-[25px] hover:border-Primary hover:bg-[#4519E80A] transition-all duration-400`}
          >
            <div className="flex flex-row items-center gap-5">
              {selectedMode === 'API' ? (
                <div className="w-[24px] h-[24px] rounded-[100px] bg-Primary flex justify-center items-center">
                  <img src="images/check.svg" />
                </div>
              ) : (
                <div className="w-[24px] h-[24px] rounded-[100px] bg-TypographyLight"></div>
              )}

              <div>
                <HeaderBold
                  content={'Use API (site specific)'}
                  lgSize="lg:text-headingBoldMd"
                  color="text-TypographyDark"
                />
                <BodyText
                  content="Import a specific website using its API."
                  xlSize="xl:text-bodySm"
                  lgSize="lg:text-bodySm"
                  mdSize="md:text-bodySm"
                  color="text-TypographyDarker"
                />
              </div>
            </div>
            <div>
              <img src="images/api-icon.svg" />
            </div>
          </div>
          <div
            onClick={() => handleModeSelection('Webflow')}
            className={`border-[1px] ${
              selectedMode === 'Webflow'
                ? 'border-Primary bg-[#4519E80A]'
                : 'border-TypographyLight bg-white'
            } p-[24px] rounded-[12px] flex flex-row gap-5 items-center justify-between cursor-pointer mb-[25px] hover:border-Primary hover:bg-[#4519E80A] transition-all duration-400`}
          >
            <div className="flex flex-row items-center gap-5">
              {selectedMode === 'Webflow' ? (
                <div className="w-[24px] h-[24px] rounded-[100px] bg-Primary flex justify-center items-center">
                  <img src="images/check.svg" />
                </div>
              ) : (
                <div className="w-[24px] h-[24px] rounded-[100px] bg-TypographyLight"></div>
              )}

              <div>
                <HeaderBold
                  content={'Connect Webflow workspace'}
                  lgSize="lg:text-headingBoldMd"
                  color="text-TypographyDark"
                />
                <BodyText
                  content="Connect to your Webflow workspace and import projects."
                  xlSize="xl:text-bodySm"
                  lgSize="lg:text-bodySm"
                  mdSize="md:text-bodySm"
                  color="text-TypographyDarker"
                />
              </div>
            </div>
            <div>
              <img src="images/webflow-icon.svg" />
            </div>
          </div>
          {state?.hasRecentConnections && (
            <div
              onClick={() => handleModeSelection('Connections')}
              className={`border-[1px] ${
                selectedMode === 'Connections'
                  ? 'border-Primary bg-[#4519E80A]'
                  : 'border-TypographyLight bg-white'
              } p-[24px] rounded-[12px] flex flex-row gap-5 items-center justify-between cursor-pointer mb-[25px] hover:border-Primary hover:bg-[#4519E80A] transition-all duration-400`}
            >
              <div className="flex flex-row items-center gap-5">
                {selectedMode === 'Connections' ? (
                  <div className="w-[24px] h-[24px] rounded-[100px] bg-Primary flex justify-center items-center">
                    <img src="images/check.svg" />
                  </div>
                ) : (
                  <div className="w-[24px] h-[24px] rounded-[100px] bg-TypographyLight"></div>
                )}

                <div>
                  <HeaderBold
                    content={'Saved connections'}
                    lgSize="lg:text-headingBoldMd"
                    color="text-TypographyDark"
                  />
                  <BodyText
                    content="Select a website from your previously connected sites."
                    xlSize="xl:text-bodySm"
                    lgSize="lg:text-bodySm"
                    mdSize="md:text-bodySm"
                    color="text-TypographyDarker"
                  />
                </div>
              </div>
              <div>
                <img src="images/save-icon.svg" />
              </div>
            </div>
          )}
          {selectedMode === 'API' ? (
            <>
              <Input
                label={'Enter API'}
                name={'API key'}
                placeholder={'API key'}
                type={'text'}
                onChange={(e) => {
                  setErrorText({ ...errorText, apiKey: '' });
                  setApiKey(e.target.value);
                }}
                value={apiKey}
                errorText={errorText.apiKey}
                icon="hashtag"
                iconColor={apiKeyInputIconColor}
                caretColor="#4519E8"
                focusClasses="border-Primary bg-[#4519E80A]"
                onFocus={() => {
                  setApiKeyInputIconColor('#4519E8');
                }}
                onBlur={() => {
                  if (!apiKey) {
                    setApiKeyInputIconColor('');
                  }
                }}
              />
              <div className="flex flex-row items-start gap-3 mt-[56px] bg-[#9EE2FF4D] rounded-[12px] p-[24px]">
                <img src="images/help.svg" />
                <div>
                  <HeaderBold
                    content="How to get API?"
                    lgSize="lg:text-headingBoldMd"
                    color="text-TypographyDark"
                  />
                  <p className="m-[0px] mt-[5px] font-manropeMedium text-TypographyDarker md:text-bodyMd sm:text-bodySm text-bodyXs cursor-context-menu">
                    Visit our learning center to learn how to connect a website using an
                    API.{' '}
                    <a className="font-manropeMedium text-Primary" href="#">
                      Learn more
                    </a>
                  </p>
                </div>
              </div>
            </>
          ) : selectedMode === 'Connections' ? (
            <Dropdown
              name="Saved Connections"
              label="Select a connection"
              placeholder="Select an option"
              icon="folder"
              iconColor={dropdownIconColor}
              onOptionSelect={(e) => {
                setSelectedConnection(e);
              }}
              options={savedConnections}
              value={selectedConnection}
              focusClasses="border-Primary bg-[#4519E80A]"
              onFocus={() => {
                setDropdownIconColor('#4519E8');
              }}
              onBlur={() => {
                if (!selectedConnection) {
                  setDropdownIconColor('');
                }
              }}
            />
          ) : selectedMode === 'Webflow' && isWebflowConnected ? (
            <Dropdown
              name="Webflow Connections"
              label="Select a connection"
              placeholder="Select an option"
              icon="folder"
              iconColor={dropdownIconColor}
              onOptionSelect={(e) => {
                setSelectedConnection(e);
              }}
              options={webflowConnections}
              value={selectedConnection}
              focusClasses="border-Primary bg-[#4519E80A]"
              onFocus={() => {
                setDropdownIconColor('#4519E8');
              }}
              onBlur={() => {
                if (!selectedConnection) {
                  setDropdownIconColor('');
                }
              }}
            />
          ) : null}
        </div>
        {/* Action buttons */}
        <div
          className={`${position} bottom-0 left-0 right-0 border-t-[1px] border-TypographyLight bg-white`}
        >
          <div className="max-w-[740px] mx-auto px-[72px] py-[24px] min-h-[120px] flex flex-row flex-wrap items-center justify-between gap-5">
            <div
              onClick={() => navigate('/dashboard')}
              className="cursor-pointer opacity-80 hover:opacity-100 transition-all duration-400"
            >
              <Header
                content="Back to dashboard"
                color="text-Primary"
                lgSize="lg:text-bodyLg"
                mdSize="md:text-bodyMd"
                smSize="sm:text-bodySm"
              />
            </div>
            <div>
              {selectedMode === 'API' ? (
                <Button
                  disabled={!apiKey}
                  label="Connect API"
                  onClick={() => handleConnectionUsingAPIKey()}
                  type="button"
                />
              ) : selectedMode === 'Webflow' ? (
                isWebflowConnected ? (
                  <Button
                    label="Proceed"
                    onClick={() => handleConfigureConnection()}
                    type="button"
                    disabled={!selectedConnection}
                  />
                ) : (
                  <Button
                    label="Authorize Webflow"
                    onClick={() => authorizeWebflow()}
                    type="button"
                  />
                )
              ) : (
                <Button
                  label="Proceed"
                  onClick={() => handleConfigureConnection()}
                  type="button"
                  disabled={!selectedConnection}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-row min-h-screen max-h-screen">
      <div className="relative flex basis-1/2 px-[72px] py-[10vh] pb-[3vh] bg-gradient-to-r from-darkBlue from-0.01% to-veryDarkBlue to-99.99% overflow-hidden">
        <div className="relative flex flex-col justify-between max-w-[740px] mx-auto">
          <div className="flex flex-row gap-5 items-center">
            <div className="flex flex-row gap-[8px] items-center">
              <div className="bg-Primary rounded-[40px] w-[40px] h-[40px] flex justify-center items-center">
                <HeaderBold
                  content="1"
                  lgSize="lg:text-bodyMd"
                  mdSize="md:text-bodyMd"
                  smSize="sm:text-bodyMd"
                />
              </div>
              <BodyText
                content={'Select website'}
                xlSize="xl:text-bodyMd"
                lgSize="lg:text-bodyMd"
                mediumFont
              />
            </div>
            <div className="h-[1.5px] bg-Secondary rounded-[15px] w-[15%]"></div>
            <div className="flex flex-row gap-[8px] items-center">
              <div className="bg-Primary rounded-[40px] w-[40px] h-[40px] flex justify-center items-center">
                <HeaderBold
                  content="2"
                  lgSize="lg:text-bodyMd"
                  mdSize="md:text-bodyMd"
                  smSize="sm:text-bodyMd"
                />
              </div>
              <BodyText
                content={'Configure'}
                xlSize="xl:text-bodyMd"
                lgSize="lg:text-bodyMd"
                mediumFont
              />
            </div>
          </div>
          <div className="mt-[5vh]">
            <Header content={`Select conversion type and CMS collection.`} />
          </div>
          <div className="mt-[3vh]">
            <BodyText
              content="Begin by choosing the website you wish to optimize."
              opacity="opacity-70"
            />
          </div>
          <div className="flex flex-row mt-auto">
            <img src="images/octopus.svg" />
            <div className="-ml-10 mt-5">
              <HelpTag
                text="Don't know how to begin?"
                link="#"
                linkText="Read our guide"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="relative basis-1/2 overflow-y-auto" ref={ref}>
        <div className="px-[72px] py-[10vh] pb-[16vh] max-w-[740px] mx-auto">
          <div
            className={
              'flex flex-row gap-4 items-center justify-between bg-InputBG rounded-[12px] px-[18px] py-[20px] border-[1px]'
            }
          >
            <div className="flex flex-row gap-4 items-center justify-between">
              <Folder fillColor={'#4519E8'} />
              <BodyText
                content={selectedConnection?.label}
                xlSize="xl:text-bodyLg"
                lgSize="lg:text-bodyLg"
                mediumFont
                color="text-TypographyDark"
              />
            </div>
            <div className="cursor-pointer" onClick={() => handleStepBack()}>
              <Header content="Edit" lgSize="lg:text-bodyLg" color="text-Primary" />
            </div>
          </div>
          <div className="mt-[24px]">
            <Header
              content="Type of conversion"
              color="text-TypographyDark"
              lgSize="lg:text-bodyMd"
            />
            <div className="mt-[12px] grid grid-cols-2 gap-4">
              <ConversionCard
                title="Convert to WebP"
                description="High-quality images with smaller file sizes."
                showRecommendedTag
                isSelected={conversionType === 'webp'}
                onClick={() => setConversionType('webp')}
              />
              <ConversionCard
                title="Basic Optimization"
                description="Standard image optimization for improved web performance."
                showRecommendedTag={false}
                isSelected={conversionType === 'basic'}
                onClick={() => setConversionType('basic')}
              />
            </div>
          </div>
          <div className="mt-[24px]">
            <div className="flex flex-row gap-4 items-center justify-between">
              <Header
                content="Select CMS collections"
                color="text-TypographyDark"
                lgSize="lg:text-bodyMd"
              />
              {Boolean(cmsCollections.length) && (
                <div
                  className="cursor-pointer"
                  onClick={() => handleSelectOrDeselectAll()}
                >
                  <Header
                    content={doAllFieldsMatch() ? 'Deselect all' : 'Select all'}
                    lgSize="lg:text-bodySm"
                    mdSize="md:text-bodySm"
                    color="text-Primary"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="mt-[12px]">
            {cmsCollections.length ? (
              <CMSCollectionsUI
                collections={cmsCollections}
                onSelect={(field, collection_name) =>
                  handleCMSCollectionsToConvert(field, collection_name)
                }
                value={selectedFields}
              />
            ) : (
              <div className="flex flex-row items-center gap-4 bg-[#E01F5B1F] px-[24px] py-[24px] rounded-[12px]">
                <Info fillColor="#E01F5B" />
                <BodyText
                  content="No images found for optimization"
                  xlSize="xl:text-bodyMd"
                  lgSize="lg:text-bodyMd"
                  color="text-TypographyDark"
                />
              </div>
            )}
          </div>
        </div>
        {/* Action buttons */}
        <div
          className={`${position} bottom-0 left-0 right-0 border-t-[1px] border-TypographyLight bg-white`}
        >
          <div className="max-w-[740px] mx-auto px-[72px] py-[24px] min-h-[120px] flex flex-row flex-wrap items-center justify-between gap-5">
            <div
              onClick={() => navigate('/dashboard')}
              className="cursor-pointer opacity-80 hover:opacity-100 transition-all duration-400"
            >
              <Header
                content="Back to dashboard"
                color="text-Primary"
                lgSize="lg:text-bodyLg"
                mdSize="md:text-bodyMd"
                smSize="sm:text-bodySm"
              />
            </div>
            <div>
              <Button
                label="Estimate Images"
                onClick={() => displayEstimation()}
                type="button"
                disabled={selectedFields.length === 0 || !cmsCollections.length}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Estimation Modal */}
      <EstimationModal
        isVisible={isEstimationModalVisible}
        estimated_time={'1 min 30 sec'}
        total_images={3}
        onCancel={() => setIsEstimationModalVisible(false)}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default Compression;
