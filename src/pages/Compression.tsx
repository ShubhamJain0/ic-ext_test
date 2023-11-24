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

const Compression = () => {
  const { state } = useLocation();
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
  const [selectedConnection, setSelectedConnection] = useState<any>(null);
  const [savedConnections, setSavedConnections] = useState<any>([
    { label: 'Noon - Make it awesome', tag: '1', value: 'id' },
    { label: 'Adelfox - Engage your audience', tag: '2', value: 'id2' },
    { label: 'Botly - Your Webflow Partner', tag: '2', value: 'id3' },
    { label: 'ThunderClap', tag: '2', value: 'id4' },
  ]);

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

  //Below positions the action div according to overflow
  useLayoutEffect(() => {
    handlePosition();
    resetStates();
    window.addEventListener('resize', handlePosition);

    return () => {
      window.removeEventListener('resize', handlePosition);
    };
  }, [selectedMode]);

  //Set dropdown icon color
  useEffect(() => {
    if (selectedConnection) {
      setDropdownIconColor('#4519E8');
    } else {
      setDropdownIconColor('');
    }
    console.log(selectedConnection);
  }, [selectedConnection]);

  return (
    <div className="flex flex-row min-h-screen max-h-screen">
      <div className="relative flex flex-col basis-1/2 p-20 bg-gradient-to-r from-darkBlue from-0.01% to-veryDarkBlue to-99.99% overflow-hidden">
        <div className="basis-4/5">
          Stepper
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
          <div className="mt-[65px]">
            <Header content={`Choose your preferred mode to begin.`} />
          </div>
          <div className="mt-[20px]">
            <BodyText
              content="Begin by choosing the website you wish to optimize."
              opacity="opacity-70"
            />
          </div>
        </div>
        <div style={{ zIndex: 1 }} className="flex flex-row">
          <img src="images/octopus.svg" />
          <div className="-ml-10 mt-5">
            <HelpTag text="Don't know how to begin?" link="#" linkText="Read our guide" />
          </div>
        </div>
      </div>
      <div className="relative basis-1/2 overflow-y-auto" ref={ref}>
        <div className="p-20">
          <div
            onClick={() => setSelectedMode('API')}
            className={`border-[1px] ${
              selectedMode === 'API'
                ? 'border-Primary bg-[#4519E80A]'
                : 'border-TypographyLight bg-white'
            } p-[24px] rounded-[12px] flex flex-row gap-5 items-center justify-between cursor-pointer mb-[25px]`}
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
            onClick={() => setSelectedMode('Webflow')}
            className={`border-[1px] ${
              selectedMode === 'Webflow'
                ? 'border-Primary bg-[#4519E80A]'
                : 'border-TypographyLight bg-white'
            } p-[24px] rounded-[12px] flex flex-row gap-5 items-center justify-between cursor-pointer mb-[25px]`}
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
              onClick={() => setSelectedMode('Connections')}
              className={`border-[1px] ${
                selectedMode === 'Connections'
                  ? 'border-Primary bg-[#4519E80A]'
                  : 'border-TypographyLight bg-white'
              } p-[24px] rounded-[12px] flex flex-row gap-5 items-center justify-between cursor-pointer mb-[25px]`}
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
              <div className="flex flex-row items-start gap-3 mt-[25px] bg-[#9EE2FF4D] rounded-[12px] p-[24px]">
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
        <div
          className={`${position} flex flex-row flex-wrap items-center justify-between gap-5 bottom-0 left-0 right-0 border-t-[1px] border-TypographyLight bg-white px-[72px] py-[24px] min-h-[120px]`}
        >
          <div onClick={() => navigate('/dashboard')} className="cursor-pointer">
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
                onClick={() => {
                  setErrorText({ ...errorText, apiKey: 'Invalid API' });
                  setApiKeyInputIconColor('red');
                }}
                type="button"
              />
            ) : selectedMode === 'Webflow' ? (
              <Button label="Authorize Webflow" onClick={() => {}} type="button" />
            ) : (
              <Button
                label="Proceed"
                onClick={() => {}}
                type="button"
                disabled={!selectedConnection}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compression;
