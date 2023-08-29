import { BlockRenderers, DocRenderers, Image } from '@el-next/components';
import { CTAButton } from './Buttons';
import { CustomEase, Item, Theme, ThemeConfig, Theming } from '@/types';
import CaptionedImage from './CaptionedImage';
import Slideshow from './Slideshow';
import Link from 'next/link';
import { Icons } from './Icons';
import ImagePlaceholder from './ImagePlaceholder';
import { ReactElement } from 'react';

const blockOverrides = (theme: ThemeConfig | null) => {
  return {
    buttonOverride: (props: { label: string; link: any }) => {
      return (
        <div className="mx-6 my-6">
          <CTAButton
            link={props.link.props.node.children[0].text}
            label={props.label}
            theme={theme ? theme.theme : Theme.none}
          />
        </div>
      );
    },
    imageOverride: (props: any) => {
      const publicId = props.image.publicId || props.image.image.publicId;
      const alt = props.image.alt || props.image.image?.alt;

      return props.caption ? (
        <div className="xl:max-w-lg flex justify-center">
          <CaptionedImage
            imgId={publicId}
            caption={props.caption}
            alt={alt}
            themeColor={theme ? theme.bg : 'bg-yellow'}
          />
        </div>
      ) : (
        <Image
          id={'img-' + publicId}
          alt={alt || ''}
          imgId={publicId}
          aspectDefault={true}
        />
      );
    },
  };
};
let AppBlocks = (theme: ThemeConfig | null) => {
  return {
    slideshow: (props: any) => {
      return (
        <Slideshow
          slides={props.slideshow.data.slides}
          theme={theme ? theme : Theming[Theme.none]}
        />
      );
    },
    iconLink: (props: any) => {
      return (
        <Link href={props.url}>
          <button
            className={`flex flex-row gap-x-2 my-2 group items-center ${theme?.text} `}
          >
            <span className="basis-5">
              <Icons icons={[props.icon]} />
            </span>
            <span
              className={`font-bold border-b-2 text-left ${theme?.text} ${theme?.border}`}
            >
              {props.label}
            </span>
            <span className="group-hover:translate-x-1 transition-transform">
              ➝
            </span>
          </button>
        </Link>
      );
    },
    embed: (props: any) => {
      if (props.html)
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: props.html as string,
            }}
          />
        );
      else return <iframe src={props.embed.open_graph.url}></iframe>;
    },
  };
};
const SuperBlocks = BlockRenderers();
const Blocks = (theme?: ThemeConfig) => {
  // return SuperBlocks(blockOverrides);
  return {
    button: SuperBlocks(blockOverrides(theme ? theme : null)).button,
    image: SuperBlocks(blockOverrides(theme ? theme : null)).image,
    video: SuperBlocks(blockOverrides(theme ? theme : null)).video,
    slideshow: AppBlocks(theme ? theme : null).slideshow,
    iconLink: AppBlocks(theme ? theme : null).iconLink,
    embed: AppBlocks(theme ? theme : null).embed,
  };
};

const Doc: any = DocRenderers({
  linkClass: 'border-b-green-blue text-green-blue hover:border-b-0',
});

const NewsEventRenderer = ({
  external,
  item,
  i,
  showIcon,
}: {
  external?: boolean;
  item: Item;
  i: number;
  showIcon?: boolean;
}) => {
  let borderColor = 'border-yellow';
  if (item.initiatives[0] === 'gunviolence') borderColor = 'border-purple';
  else if (item.initiatives[0] === 'climate') borderColor = 'border-leaf';
  return (
    <div className="mt-6 lg:mt-0">
      <div className="relative">
        {showIcon && (
          <div className="absolute right-4 top-4 p-2 bg-white rounded-full group">
            {item.eventDate ? (
              <>
                <div className="relative">
                  <span className="absolute -top-10 -left-1 scale-0 translate-y-4 transition-all group-hover:scale-100 group-hover:translate-y-0">
                    <svg viewBox="3 6.317 41 24.354" width="41" height="24.354">
                      <path d="M 44 6.878 C 44 6.568 43.633 6.317 43.18 6.317 L 3.82 6.317 C 3.367 6.317 3 6.568 3 6.878 L 3 25.898 C 3 26.207 3.367 26.459 3.82 26.459 L 18.229 26.459 L 22.858 30.459 C 23.013 30.593 23.249 30.671 23.5 30.671 C 23.751 30.671 23.987 30.593 24.142 30.459 L 28.771 26.459 L 43.18 26.459 C 43.633 26.459 44 26.207 44 25.898 L 44 6.878 Z M 42.36 25.336 L 28.375 25.336 C 28.124 25.336 27.889 25.415 27.733 25.548 L 23.5 29.206 L 19.267 25.548 C 19.111 25.415 18.876 25.336 18.625 25.336 L 4.64 25.336 L 4.64 7.44 L 42.36 7.44 L 42.36 25.336 Z"></path>
                      <path
                        d="M 23.513 29.203 L 18.842 25.289 L 28.198 25.284 L 23.513 29.203 Z M 4.613 7.434 L 42.398 7.434 L 42.398 25.39 L 4.613 25.39 L 4.613 7.434 Z"
                        style={{ fill: 'white' }}
                      ></path>
                    </svg>
                    <div className="absolute top-0 left-[5px] text-xs text-grey font-semibold">
                      Event
                    </div>
                  </span>
                  <svg height="30" viewBox="0 -960 960 960" width="30">
                    <path
                      fill="#444"
                      d="M596.817-220Q556-220 528-248.183q-28-28.183-28-69T528.183-386q28.183-28 69-28T666-385.817q28 28.183 28 69T665.817-248q-28.183 28-69 28ZM180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z"
                    />
                  </svg>
                </div>
              </>
            ) : (
              <div className="relative">
                <span className="absolute -top-10 -left-1 scale-0 translate-y-4 transition-all text-xs text-grey font-semibold group-hover:scale-100 group-hover:translate-y-0">
                  <svg viewBox="3 6.317 41 24.354" width="41" height="24.354">
                    <path d="M 44 6.878 C 44 6.568 43.633 6.317 43.18 6.317 L 3.82 6.317 C 3.367 6.317 3 6.568 3 6.878 L 3 25.898 C 3 26.207 3.367 26.459 3.82 26.459 L 18.229 26.459 L 22.858 30.459 C 23.013 30.593 23.249 30.671 23.5 30.671 C 23.751 30.671 23.987 30.593 24.142 30.459 L 28.771 26.459 L 43.18 26.459 C 43.633 26.459 44 26.207 44 25.898 L 44 6.878 Z M 42.36 25.336 L 28.375 25.336 C 28.124 25.336 27.889 25.415 27.733 25.548 L 23.5 29.206 L 19.267 25.548 C 19.111 25.415 18.876 25.336 18.625 25.336 L 4.64 25.336 L 4.64 7.44 L 42.36 7.44 L 42.36 25.336 Z"></path>
                    <path
                      d="M 23.513 29.203 L 18.842 25.289 L 28.198 25.284 L 23.513 29.203 Z M 4.613 7.434 L 42.398 7.434 L 42.398 25.39 L 4.613 25.39 L 4.613 7.434 Z"
                      style={{ fill: 'white' }}
                    ></path>
                  </svg>
                  <div className="absolute top-0 left-[5px] text-xs text-grey font-semibold">
                    News
                  </div>
                </span>
                <svg height="30" viewBox="0 -960 960 960" width="30">
                  <path
                    fill="#444"
                    d="M140-120q-24 0-42-18t-18-42v-489h60v489h614v60H140Zm169-171q-24 0-42-18t-18-42v-489h671v489q0 24-18 42t-42 18H309Zm0-60h551v-429H309v429Zm86-131h168v-215H395v215Zm211 0h168v-88H606v88Zm0-127h168v-88H606v88ZM309-351v-429 429Z"
                  />
                </svg>
              </div>
            )}
          </div>
        )}
        <div>
          {item.thumbnail ? (
            <Image
              id={`thumb-${i}`}
              alt={item.thumbAltText}
              transforms="f_auto,dpr_auto,c_fill,g_face,h_290,w_460"
              imgId={item.thumbnail.publicId}
              width={460}
              maxWidthDisable={true}
              className="w-full"
            />
          ) : (
            <ImagePlaceholder
              imageLabel="News/Event"
              width={335}
              height={200}
            />
          )}
        </div>
        <hr
          className={`border-b-[15px] transition-transform origin-bottom ${CustomEase} duration-600 scale-y-100 group-hover:scale-y-[200%] ${borderColor}`}
        />
      </div>

      <h3 className="text-bluegreen hover:text-green-blue group-hover:text-green-blue text-xl font-semibold my-1">
        {item.name || item.title}{' '}
        {external && (
          <svg
            viewBox="0 0 20 20"
            width="20"
            height="20"
            className="inline ml-1"
          >
            <g transform="matrix(0.042265, 0, 0, 0.042265, 0, 2)">
              <g>
                <path
                  d="M266.422,0h-97.625c-9.65,0-17.5,7.851-17.5,17.5c0,9.649,7.85,17.5,17.5,17.5h55.377l-92.375,92.374   c-3.307,3.305-5.127,7.699-5.127,12.375c0,4.676,1.819,9.069,5.125,12.371c3.306,3.309,7.699,5.13,12.375,5.13   c4.674,0,9.069-1.82,12.376-5.127l92.374-92.375v55.377c0,9.649,7.851,17.5,17.5,17.5c9.649,0,17.5-7.851,17.5-17.5V17.5   C283.922,7.851,276.071,0,266.422,0z"
                  className=" fill-bluegreen transition-all group-hover:translate-x-5 group-hover:-translate-y-5 group-hover:fill-green-blue"
                ></path>
                <path
                  d="M201.137,253.922H30V82.785h128.711l30-30H15c-8.284,0-15,6.716-15,15v201.137c0,8.284,6.716,15,15,15h201.137   c8.284,0,15-6.716,15-15V95.211l-30,30V253.922z"
                  className=" fill-bluegreen transition-all group-hover:fill-green-blue"
                ></path>
              </g>
            </g>
          </svg>
        )}
      </h3>
      <div>
        {new Date(
          item.publishDate ? item.publishDate : item.eventDate
        ).toLocaleDateString('en-US', {
          weekday: 'long',
        })}
        &nbsp;
        {new Date(
          item.publishDate ? item.publishDate : item.eventDate
        ).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
        })}
        &nbsp;
        {new Date(
          item.publishDate ? item.publishDate : item.eventDate
        ).toLocaleDateString('en-US', {
          year: 'numeric',
        })}
      </div>
      <p>
        {item.summary.length > 150
          ? `${item.summary.substring(
              0,
              item.summary.substring(0, 150).lastIndexOf(' ')
            )}...`
          : item.summary}
      </p>
    </div>
  );
};
const QuoteRenderer = (
  children: ReactElement[],
  item: any,
  theme: ThemeConfig
) => {
  if (
    children.length > 1 &&
    children[children.length - 1].props.node.type === 'paragraph'
  )
    return (
      <div className="my-4">
        {children.slice(0, children.length - 1).map((child) => (
          <p className={`italic text-lg font-bold ${theme.text}`}>
            {child.props.node.children[0].text}
          </p>
        ))}
        <p className="text-right font-bold">
          &mdash;{' '}
          <span className={theme.text}>
            {children[1].props.node.children[0].text}
          </span>
        </p>
      </div>
    );
  else
    return (
      <p className="bg-red text-white font-bold text-2xl p-4">
        Quote block error: quotes need to be followed by a full line break
        before attribution. Example:
        <br />
        <code>
          “This is a long quote.”
          <br />
          <br />
          Name, Title
        </code>
      </p>
    );
};
export { Blocks, Doc, NewsEventRenderer, QuoteRenderer };
