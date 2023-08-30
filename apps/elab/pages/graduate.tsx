import { ReactElement, ReactNode } from 'react';
import { InferGetStaticPropsType } from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import { Button, HeadingStyle, Image, Query } from '@el-next/components';

// import query from '../../../../apollo-client';
import Layout from '../components/Layout';
import Divider from '../components/Divider';
import { CTAButton } from '@/components/Buttons';
import {
  CustomEase,
  News,
  ResearchProject,
  Studio,
  StudioProject,
  Theme,
  Theming,
} from '@/types';
import CaptionedImage from '@/components/CaptionedImage';
import { Blocks, Doc } from '@/components/Renderers';
import { Gutter } from '@/components/Gutter';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Link from 'next/link';

type GradPage = {
  intro: { document: any };
  introImage: {
    publicId: string;
  };
  introImageAltText: string;
  introImageCaption: string;
  mediaDesign: { document: any };
  symposium: { document: any };
  salzburg: { document: any };

  projectSpotlight: StudioProject[];
  alumniSpotlight: News[];
};

const rendererOverrides = {
  heading: (level: number, children: ReactNode, textAlign: any) => {
    const customRenderers = {
      4: `text-lg font-bold mt-4 pl-4 pb-4 text-red border-red border-l-2 border-b-2`,
    };
    return HeadingStyle({ level, children, textAlign, customRenderers });
  },
};

export default function Initiatives({
  page,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout error={error} fullBleed={true}>
      {page && (
        <div className="text-grey">
          <div className="flex flex-col lg:flex-row justify-start">
            <div className="px-4 md:px-20 lg:pl-20 my-0 lg:mt-14 xl:mt-16 xl:mb-20 w-full lg:w-4/6 xl:w-1/2">
              <h1 className="font-extrabold text-black">Graduate Curriculum</h1>
              <div className="flex flex-col studios-center w-full">
                <DocumentRenderer
                  document={page.intro.document}
                  componentBlocks={Blocks()}
                  renderers={Doc(rendererOverrides)}
                />
              </div>
              <div className="hidden lg:block w-full mt-6 mb-12">
                <p className="text-xl lg:text-3xl font-extrabold uppercase">
                  Jump to:
                </p>
                <Button
                  label="Graduate M.A.: Media Design"
                  anchorId="ma"
                  className="border-teal text-teal fill-yellow"
                />
                <Button
                  label="Social Justice + Media Symposium"
                  anchorId="sjm"
                  className="border-teal text-teal fill-yellow"
                />
                {/* <Button
                  label="Alumni Spotlight"
                  anchorId="alumni"
                  className="border-teal text-teal fill-yellow"
                /> */}
              </div>
            </div>
            <div className="flex justify-center my-12 w-full lg:w-3/5 max-w-xl">
              <CaptionedImage
                alt={page.introImageAltText}
                imgId={page?.introImage.publicId}
                caption={page?.introImageCaption}
                themeColor="bg-teal"
              />
            </div>
          </div>
          <Divider />

          <div id="ma">
            <Gutter>
              <div className="flex flex-col lg:flex-row-reverse lg:items-center justify-center gap-x-10">
                <h2 className="font-bold">
                  <span className="uppercase">Graduate M.A.</span>
                  <br />
                  <span className=" text-4xl">Media Design</span>
                </h2>

                <svg
                  viewBox="0 0 1040 452"
                  width="1040"
                  height="150"
                  fill="none"
                  className="mt-6 max-w-full lg:max-w-sm"
                >
                  <title>Media Design logo</title>
                  <path
                    fill="#00AB9E"
                    d="M 864.569 4.195 L 864.569 219.08 L 908.735 219.08 C 908.735 194.976 928.343 175.403 952.491 175.403 C 976.639 175.403 996.244 194.976 996.244 219.083 L 1040 219.083 L 1040 4.195 L 864.569 4.195 Z M 952.491 131.726 C 928.343 131.726 908.735 112.153 908.735 88.046 C 908.735 63.943 928.343 44.373 952.491 44.373 C 976.639 44.373 996.244 63.943 996.244 88.05 C 996.244 112.153 976.639 131.726 952.491 131.726 Z"
                  ></path>
                  <path
                    fill="#F72923"
                    d="M 820.92 109.962 C 820.92 96.887 815.155 85.252 806.097 77.223 C 805.375 77.841 805.375 76.606 806.097 77.223 C 815.155 69.194 820.92 57.561 820.92 44.487 C 820.92 20.398 801.362 0.843 777.272 0.843 C 753.182 0.843 733.623 20.398 733.623 44.487 C 733.623 57.46 739.288 69.091 748.347 77.119 L 748.347 77.327 C 739.288 85.356 733.623 96.988 733.623 109.959 C 733.623 122.932 739.288 134.562 748.347 142.591 L 748.347 142.799 C 739.288 150.828 733.623 162.462 733.623 175.431 C 733.623 199.521 753.182 219.08 777.272 219.08 C 801.362 219.08 820.92 199.521 820.92 175.434 C 820.92 162.359 815.155 150.724 806.097 142.695 C 805.375 143.312 805.375 142.078 806.097 142.695 C 815.155 134.666 820.92 123.032 820.92 109.959 Z"
                  ></path>
                  <path
                    fill="#F6A536"
                    d="M 589.738 0.208 L 589.738 0 L 523.778 0 L 523.778 219.08 L 589.738 219.08 L 589.738 218.871 C 647.042 215.464 692.494 167.825 692.494 109.539 C 692.494 51.258 647.042 3.616 589.738 0.208 Z M 608.084 164.31 C 608.084 138.993 578.711 109.539 553.46 109.539 C 578.711 109.539 608.084 80.087 608.084 54.77 C 608.084 80.087 637.457 109.544 662.708 109.544 C 637.561 109.544 608.084 138.993 608.084 164.31 Z"
                  ></path>
                  <path
                    fill="#00AB9E"
                    d="M 478.448 44.487 L 478.448 0.843 L 306.377 0.843 L 306.377 44.487 L 328.324 44.487 L 328.324 88.134 L 306.377 88.134 L 306.377 131.782 L 328.324 131.782 L 328.324 175.431 L 306.377 175.431 L 306.377 219.08 L 478.448 219.08 L 478.448 175.434 L 394.173 175.434 L 394.173 131.779 L 478.448 131.779 L 478.448 88.134 L 394.173 88.134 L 394.173 44.487 L 478.448 44.487 Z"
                  ></path>
                  <path
                    fill="#F72923"
                    d="M 263.467 219.752 L 197.288 219.752 L 196.775 78.797 L 131.834 222.439 L 66.896 78.794 L 66.279 219.749 L 0 219.749 L 0 61.54 C 0 40.56 10.41 21.337 27.934 9.97 C 45.56 -1.397 67.413 -3.155 86.379 5.425 C 95.447 9.558 103.59 16.172 109.883 24.54 L 131.733 77.244 L 153.687 24.545 C 159.976 16.176 168.015 9.457 177.192 5.43 C 196.15 -3.155 218.005 -1.501 235.629 9.97 C 253.153 21.237 263.563 40.56 263.563 61.537 L 263.563 219.752 L 263.459 219.752 Z"
                  ></path>
                  <path
                    fill="#000"
                    d="M 587.484 399.286 C 585.836 401.651 583.972 403.734 581.676 405.452 C 579.593 407.104 576.939 408.467 573.858 409.758 C 570.773 410.975 567.041 411.622 562.666 411.622 C 549.829 411.622 539.788 407.462 532.543 399.213 C 525.299 390.966 521.64 379.131 521.64 363.852 C 521.64 356.754 522.499 350.295 524.221 344.56 C 525.942 338.752 528.596 333.799 532.185 329.57 C 535.698 325.337 540.219 322.11 545.739 319.741 C 551.192 317.446 557.647 316.298 565.107 316.298 C 566.825 316.298 568.69 316.514 570.7 317.018 C 572.71 317.519 574.644 318.236 576.581 319.098 C 578.546 319.974 580.4 321.08 582.104 322.395 C 583.826 323.685 585.332 325.191 586.552 326.77 L 586.552 280.507 L 606.85 280.507 L 606.85 409.758 L 587.484 409.758 L 587.484 399.286 Z M 565.107 333.657 C 561.16 333.657 557.717 334.519 554.847 336.168 C 551.978 337.816 549.686 340.112 547.822 342.981 C 545.94 346.007 544.584 349.328 543.801 352.806 C 542.942 356.496 542.511 360.277 542.515 364.068 C 542.515 367.942 542.942 371.671 543.801 375.256 C 544.664 378.842 546.027 382.073 547.818 384.796 C 549.61 387.516 552.02 389.777 554.847 391.394 C 557.717 393.046 561.16 393.905 565.107 393.905 C 568.836 393.905 572.063 393.046 574.79 391.394 C 577.506 389.763 579.833 387.561 581.603 384.939 C 583.44 382.275 584.799 379.315 585.62 376.189 C 586.479 372.961 586.907 369.733 586.907 366.506 L 586.907 362.562 C 586.785 358.903 586.257 355.272 585.332 351.732 C 584.479 348.459 583.123 345.336 581.315 342.48 C 579.607 339.827 577.298 337.615 574.574 336.025 C 571.921 334.446 568.766 333.657 565.104 333.657 Z M 709.703 379.346 C 708.486 385.301 706.618 390.319 704.11 394.479 C 701.599 398.569 698.587 401.939 694.998 404.45 C 691.416 407.031 687.326 408.826 682.878 409.973 C 678.433 411.121 673.626 411.622 668.534 411.622 C 660.786 411.622 654.188 410.405 648.665 407.963 C 643.142 405.528 638.551 402.224 634.965 397.995 C 631.38 393.763 628.726 388.744 627.004 383.005 C 625.356 377.197 624.493 370.881 624.493 364.068 C 624.493 355.964 625.571 348.935 627.651 342.981 C 629.731 337.027 632.743 332.078 636.544 328.134 C 640.346 324.19 644.937 321.317 650.244 319.383 C 655.624 317.446 661.575 316.514 668.176 316.514 C 674.416 316.514 680.081 317.519 685.173 319.526 C 690.167 321.456 694.657 324.496 698.299 328.422 C 701.958 332.366 704.827 337.242 706.764 343.124 C 708.771 349.005 709.776 355.891 709.776 363.71 L 709.776 370.238 L 645.51 370.238 C 645.837 373.333 646.484 376.383 647.444 379.346 C 648.38 382.216 649.74 384.727 651.534 386.876 C 653.329 389.029 655.621 390.751 658.351 392.041 C 661.074 393.258 664.444 393.905 668.388 393.905 C 678.934 393.905 685.535 389.029 688.185 379.346 L 709.703 379.346 Z M 688.042 353.238 C 687.823 350.667 687.194 348.146 686.178 345.777 C 685.208 343.482 683.851 341.371 682.161 339.538 C 680.513 337.747 678.433 336.31 676.064 335.236 C 673.699 334.158 671.042 333.657 668.03 333.657 C 664.66 333.657 661.718 334.231 659.064 335.305 C 656.483 336.453 654.188 337.889 652.324 339.681 C 650.46 341.458 648.95 343.576 647.875 345.92 C 646.78 348.198 646.077 350.65 645.796 353.165 L 688.042 353.165 L 688.042 353.238 Z M 743.056 384.007 C 743.415 387.234 745.206 389.676 748.364 391.394 C 751.518 393.116 755.181 393.905 759.267 393.905 C 760.989 393.905 762.78 393.763 764.574 393.404 C 766.366 393.116 768.018 392.472 769.451 391.61 C 770.873 390.747 772.076 389.568 772.963 388.167 C 773.899 386.734 774.4 384.939 774.4 382.859 C 774.4 381.138 773.968 379.632 772.967 378.484 C 771.937 377.246 770.637 376.265 769.162 375.615 C 767.336 374.822 765.44 374.196 763.496 373.75 C 761.347 373.25 758.978 372.818 756.471 372.46 C 752.596 371.744 748.722 370.881 744.778 370.022 C 740.831 369.16 737.318 367.796 734.233 365.932 C 731.064 364.002 728.428 361.317 726.561 358.114 C 724.55 354.744 723.545 350.299 723.545 344.703 C 723.545 339.754 724.481 335.451 726.345 331.939 C 728.146 328.499 730.696 325.508 733.802 323.185 C 736.887 320.889 740.545 319.241 744.705 318.162 C 748.865 317.088 753.24 316.587 757.831 316.587 C 767.371 316.587 775.332 318.882 781.502 323.4 C 787.741 327.922 790.896 334.589 791.042 343.266 L 771.819 343.266 C 771.315 340.543 769.663 338.248 766.87 336.453 C 764.119 334.662 760.902 333.712 757.619 333.73 C 754.029 333.73 750.802 334.516 747.933 336.164 C 745.063 337.816 743.63 340.042 743.63 342.912 C 743.63 344.918 744.131 346.567 745.206 347.857 C 746.284 349.151 747.647 350.222 749.438 351.158 C 751.4 352.107 753.473 352.806 755.608 353.238 C 757.973 353.738 760.411 354.17 762.853 354.528 C 766.71 355.171 770.536 355.957 774.33 356.893 C 778.128 357.828 781.502 359.261 784.514 361.272 C 787.525 363.278 789.894 366.002 791.758 369.445 C 793.622 372.961 794.554 377.552 794.554 383.217 C 794.554 388.598 793.476 393.046 791.4 396.774 C 789.369 400.353 786.517 403.4 783.077 405.668 C 779.568 407.921 775.68 409.525 771.6 410.401 C 767.503 411.305 763.319 411.764 759.121 411.764 C 754.029 411.764 749.223 411.264 744.635 410.189 C 740.114 409.111 736.17 407.462 732.8 405.24 C 729.454 403.052 726.679 400.103 724.696 396.632 C 722.613 393.119 721.608 388.956 721.608 384.153 L 743.056 384.153 L 743.056 384.007 Z M 811.697 300.661 L 811.697 278.5 L 833.358 278.5 L 833.358 300.661 L 811.701 300.661 Z M 812.271 409.758 L 812.271 318.162 L 832.784 318.162 L 832.784 409.758 L 812.271 409.758 Z M 916.129 399.859 C 914.495 402.117 912.537 404.123 910.318 405.814 C 908.454 407.32 906.089 408.61 903.219 409.827 C 900.35 410.975 897.049 411.622 893.321 411.622 C 886.003 411.622 879.621 410.474 874.314 408.109 C 868.934 405.741 864.558 402.44 861.042 398.211 C 857.53 393.978 855.018 388.887 853.37 383.005 C 851.718 377.124 850.932 370.666 850.932 363.71 C 850.932 348.65 854.733 337.027 862.336 328.708 C 869.939 320.458 880.265 316.298 893.321 316.298 C 897.265 316.298 900.708 316.872 903.578 318.093 C 906.447 319.241 908.885 320.531 910.822 321.894 C 913.045 323.543 914.982 325.337 916.63 327.275 L 916.63 318.162 L 936.427 318.162 L 936.427 411.406 C 936.427 417.36 935.422 422.668 933.415 427.259 C 931.408 431.85 928.608 435.794 925.023 439.021 C 921.437 442.249 917.135 444.69 912.185 446.408 C 907.236 448.057 901.783 448.919 895.975 448.919 C 889.735 448.919 884.139 448.345 879.117 447.271 C 874.098 446.123 869.723 444.471 866.064 442.106 C 862.406 439.811 859.536 436.799 857.603 433.14 C 855.592 429.481 854.587 425.036 854.587 419.798 L 876.61 419.798 C 877.11 422.883 878.905 425.468 881.986 427.544 C 885.071 429.624 889.161 430.629 894.111 430.629 C 900.924 430.629 906.304 428.907 910.248 425.537 C 914.192 422.094 916.129 417.218 916.129 410.905 L 916.129 399.859 Z M 894.684 333.657 C 890.953 333.657 887.656 334.446 884.786 336.022 C 881.962 337.545 879.531 339.708 877.684 342.334 C 875.82 344.988 874.384 348.219 873.452 351.947 C 872.519 355.676 872.088 359.693 872.088 363.852 C 872.088 368.228 872.519 372.171 873.452 375.761 C 874.384 379.343 875.82 382.574 877.757 385.297 C 879.691 388.024 882.059 390.177 884.929 391.61 C 887.798 393.116 891.095 393.836 894.827 393.836 C 898.701 393.836 901.999 392.973 904.725 391.252 C 907.452 389.53 909.674 387.234 911.466 384.365 C 913.253 381.364 914.537 378.094 915.267 374.683 C 916.056 371.1 916.488 367.438 916.488 363.852 C 916.488 360.27 916.056 356.608 915.267 353.022 C 914.537 349.607 913.253 346.337 911.466 343.339 C 909.744 340.47 907.452 338.175 904.652 336.314 C 901.856 334.589 898.555 333.657 894.684 333.657 Z M 977.668 318.166 L 977.668 327.129 C 980.433 323.369 984.217 320.482 988.572 318.809 C 993.02 317.161 997.249 316.298 1001.339 316.298 C 1013.175 316.298 1022.569 318.952 1029.528 324.332 C 1036.484 329.713 1040 338.244 1040 350.083 L 1040 409.758 L 1019.487 409.758 L 1019.487 351.231 C 1019.487 345.635 1017.477 341.333 1013.533 338.248 C 1009.589 335.236 1004.709 333.657 998.971 333.657 C 993.02 333.657 988.071 335.378 984.269 338.891 C 980.395 342.407 978.458 347.214 978.458 353.453 L 978.458 409.758 L 957.945 409.758 L 957.945 318.162 L 977.668 318.162 Z"
                  ></path>
                </svg>
              </div>
              <DocumentRenderer
                document={page.mediaDesign.document}
                componentBlocks={Blocks()}
                renderers={Doc({
                  heading: (
                    level: number,
                    children: ReactNode,
                    textAlign: any
                  ) => {
                    const customRenderers = {
                      4: `font-bold my-2 uppercase text-yellow`,
                    };
                    return HeadingStyle({
                      level,
                      children,
                      textAlign,
                      customRenderers,
                    });
                  },
                })}
              />
            </Gutter>
          </div>
          <Divider />
          <div id="sjm">
            <Gutter>
              <div className="flex flex-col lg:flex-row items-center justify-start">
                <h2 className="font-bold text-4xl lg:w-1/2">
                  Social Justice and Media Symposium
                </h2>
                {/* <Image
                  id="sjm"
                  alt="Social Justice and Media Symposium logo"
                  // transforms="f_auto,dpr_auto,c_fill,g_face,h_290,w_460"
                  imgId="elab-home-v3.x/logos/sjm"
                  width={300}
                  // maxWidthDisable={true}
                  // className="w-full"
                /> */}
              </div>
              <DocumentRenderer
                document={page.symposium.document}
                componentBlocks={Blocks()}
                renderers={Doc()}
              />
            </Gutter>
          </div>
          <Divider />

          <Gutter>
            <h2 className="font-bold text-4xl">
              Salzburg Creativity, Media and Global Change Program
            </h2>
            <DocumentRenderer
              document={page.salzburg.document}
              componentBlocks={Blocks()}
              renderers={Doc()}
            />
          </Gutter>

          {page.projectSpotlight && page.projectSpotlight.length > 0 && (
            <Divider />
          )}
          <Gutter>
            {page.projectSpotlight && page.projectSpotlight.length > 0 && (
              <div id="projects">
                <h2 className="font-bold text-4xl">Project Spotlight</h2>
                <div className="my-8 grid md:grid-cols-2 xl:grid-cols-3 xl:gap-5 xl:gap-y-10 lg:gap-2 text-grey">
                  {page.projectSpotlight.map(
                    (item: StudioProject, i: number) => {
                      let borderColor = 'border-yellow';
                      if (item.initiative === 'gunviolence')
                        borderColor = 'border-purple';
                      else if (item.initiative === 'climate')
                        borderColor = 'border-leaf';
                      return (
                        <Link
                          href={`/studios/projects/${item.key}`}
                          className="group"
                        >
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
                              imageLabel="Project"
                              width={200}
                              height={200}
                            />
                          )}

                          <hr
                            className={`border-b-[15px] transition-transform origin-bottom ${CustomEase} duration-600 scale-y-100 group-hover:scale-y-[200%] ${borderColor}`}
                          />
                          <h3 className="hover:text-green-blue group-hover:text-green-blue text-xl font-semibold my-1">
                            {item.name}
                          </h3>
                          <p>{item.shortDescription}</p>
                        </Link>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </Gutter>
          {page.alumniSpotlight && page.alumniSpotlight.length > 0 && (
            <Divider />
          )}

          <Gutter>
            {page.alumniSpotlight && page.alumniSpotlight.length > 0 && (
              <div id="alumni">
                <h2 className="font-bold text-4xl">Alumni Spotlight</h2>
                <div className="my-8 grid md:grid-cols-2 xl:grid-cols-3 xl:gap-5 xl:gap-y-10 lg:gap-2 text-grey">
                  {page.alumniSpotlight.map((item: News, i: number) => {
                    return (
                      <Link href={`/news/${item.key}`} className="group">
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
                            imageLabel="News"
                            width={200}
                            height={200}
                          />
                        )}

                        <h3 className="hover:text-green-blue group-hover:text-green-blue text-xl font-semibold my-1">
                          {item.title}
                        </h3>
                        <p>{item.summary}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </Gutter>
        </div>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const result = await Query(
    'graduates',
    `graduates {
        intro { document }
        introImage {
          publicId
        }
        introImageAltText
        introImageCaption
        mediaDesign { document }
        symposium { document }
        salzburg { document }
        projectSpotlight {
            name
            key
            shortDescription 
            thumbnail { 
                publicId
            }
            thumbAltText
            initiative
        }
        alumniSpotlight {
            title
            key
            summary 
            thumbnail { 
                publicId
            }
            thumbAltText
            initiatives
        }
      }
    `
  );
  if (result.error) {
    return {
      props: {
        error: result.error,
        page: null,
      },
    };
  }
  const page = result[0] as GradPage;
  return {
    props: {
      page,
      error: null,
    },
  };
}
