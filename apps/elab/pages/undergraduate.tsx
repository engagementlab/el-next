import { ReactNode } from 'react';
import { InferGetStaticPropsType } from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import { Button, Image, ImageUrl, Query } from '@el-next/components';

import Layout from '../components/Layout';
import Divider from '../components/Divider';
import {
  CustomEase,
  DefaultWhereCondition,
  OGParams,
  Studio,
  StudioPreview,
  StudioProject,
  Theming,
} from '@/types';
import CaptionedImage from '@/components/CaptionedImage';
import {
  Blocks,
  Doc,
  Heading,
  StudioPreviewRenderer,
} from '@/components/Renderers';
import { Gutter } from '@/components/Gutter';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Link from 'next/link';
import { GetThemeFromDBKey } from '@/shared';

type UndergradPage = {
  intro: { document: any };
  introImage: {
    publicId: string;
  };
  introImageAltText: string;
  introImageCaption: string;
  socialImpactDesign: { document: any };
  projectSpotlight: StudioProject[];
  studioPreviews: StudioPreview[];
  featuredSemesters?: StudioPreview[];
} & OGParams;

const rendererOverrides = {
  heading: (level: number, children: ReactNode, textAlign: any) => {
    const customRenderers = {
      4: `text-lg font-bold mt-4 pl-4 pb-4 text-red border-red border-l-2 border-b-2`,
    };
    return Heading(level, children, textAlign, customRenderers);
  },
};

export default function Undergraduate({
  page,
  studios,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!page) return null;
  return (
    <Layout
      error={error}
      fullBleed={true}
      title="Undergraduate Curriculum"
      ogDescription={
        page.ogDescription ||
        'Learn about our current undergraduate curriculum.'
      }
      ogImageId={
        page.ogImage && page.ogImage.publicId
          ? page.ogImage.publicId
          : page.introImage.publicId
      }
    >
      {page && (
        <div className="text-grey">
          <div className="flex flex-col lg:flex-row justify-start">
            <div className="px-4 md:px-20 lg:pl-20 my-0 lg:mt-14 xl:mt-16 xl:mb-20 w-full lg:w-4/6 xl:w-1/2">
              <h1 className="font-extrabold text-black">
                Undergraduate Curriculum
              </h1>

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
                  label="Undergraduate Minor: Social Impact Design"
                  anchorId="sid"
                  className="border-teal text-teal fill-yellow"
                />
                <Button
                  label="Social Impact Studios"
                  anchorId="studios"
                  className="border-teal text-teal fill-yellow"
                />
                <Button
                  label="Project Spotlight"
                  anchorId="projects"
                  className="border-teal text-teal fill-yellow"
                />
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

          <Gutter>
            <div className="flex flex-col lg:flex-row-reverse lg:items-center justify-center gap-x-10">
              <h2 className="font-bold">
                <span className="uppercase">Undergraduate Minor</span>
                <br />
                <span className="text-4xl">Social Impact Design</span>
              </h2>
              <svg
                id="sid"
                viewBox="2.559 -0.012 395.774 217.842"
                width="780"
                className="max-w-full lg:max-w-md"
              >
                <title>Social Impact Design Minor logo</title>
                <g id="svg">
                  <path
                    id="path0"
                    d="M154.092 0.266 C 148.831 1.944,148.203 9.568,153.121 12.060 C 157.819 14.441,163.177 10.137,161.925 4.987 C 161.039 1.340,157.470 -0.810,154.092 0.266 M150.875 117.115 L 150.917 211.917 155.833 214.871 C 158.537 216.496,160.806 217.828,160.875 217.830 C 160.944 217.832,160.981 175.221,160.958 123.140 L 160.917 28.446 158.750 27.122 C 157.050 26.083,151.603 22.774,150.958 22.388 C 150.889 22.347,150.852 64.974,150.875 117.115 M337.167 93.436 C 329.998 94.333,325.044 96.621,320.586 101.090 C 311.187 110.514,310.417 127.514,318.908 138.155 C 329.471 151.395,351.625 150.666,359.976 136.804 L 360.345 136.191 359.964 135.913 C 354.746 132.109,353.076 131.022,352.871 131.297 C 348.288 137.467,340.636 139.572,333.333 136.674 C 320.363 131.526,319.674 111.215,332.255 104.872 C 339.228 101.356,349.119 103.623,352.633 109.542 C 352.976 110.119,353.032 110.116,353.911 109.458 C 354.477 109.035,358.619 106.105,360.124 105.064 C 360.847 104.563,357.026 100.086,353.917 97.790 C 349.711 94.685,342.391 92.782,337.167 93.436 M169.500 120.500 L 169.500 146.833 174.500 146.833 L 179.500 146.833 179.500 130.300 C 179.500 120.828,179.562 113.834,179.646 113.925 C 179.726 114.012,180.261 115.208,180.834 116.583 C 181.407 117.958,182.158 119.758,182.502 120.583 C 183.028 121.841,185.565 127.974,189.915 138.500 C 190.388 139.646,191.362 141.991,192.079 143.711 L 193.383 146.839 197.121 146.795 L 200.858 146.750 204.605 137.750 C 206.666 132.800,208.604 128.150,208.910 127.417 C 209.217 126.683,209.843 125.183,210.301 124.083 C 210.759 122.983,211.619 120.921,212.211 119.500 C 212.804 118.079,213.577 116.223,213.929 115.375 C 214.282 114.527,214.629 113.833,214.702 113.833 C 214.774 113.833,214.833 121.258,214.833 130.333 L 214.833 146.833 219.833 146.833 L 224.833 146.833 224.833 120.500 L 224.833 94.167 219.325 94.167 L 213.816 94.167 213.560 94.792 C 213.274 95.489,211.228 100.344,209.503 104.417 C 207.669 108.749,205.301 114.365,203.917 117.667 C 203.206 119.362,202.115 121.950,201.493 123.417 C 200.481 125.800,198.152 131.321,197.414 133.083 C 197.168 133.671,197.119 133.711,196.998 133.417 C 196.922 133.233,196.096 131.283,195.163 129.083 C 194.229 126.883,193.105 124.221,192.665 123.167 C 191.589 120.586,189.997 116.798,187.341 110.500 C 182.904 99.975,181.809 97.385,181.124 95.792 L 180.425 94.167 174.963 94.167 L 169.500 94.167 169.500 120.500 M232.167 120.489 L 232.167 146.833 237.083 146.833 L 242.000 146.833 242.000 138.430 L 242.000 130.027 247.708 129.958 C 252.119 129.904,253.701 129.828,254.667 129.620 C 263.544 127.714,268.557 121.389,268.565 112.083 C 268.573 103.051,264.042 97.015,255.512 94.699 L 253.917 94.266 243.042 94.206 L 232.167 94.145 232.167 120.489 M281.576 98.958 C 280.588 101.594,279.576 104.313,279.326 105.000 C 279.076 105.688,278.337 107.659,277.683 109.381 C 277.029 111.103,276.395 112.790,276.273 113.131 C 275.942 114.060,271.862 124.994,271.596 125.667 C 271.314 126.380,270.771 127.830,269.008 132.583 C 268.259 134.600,267.546 136.512,267.422 136.833 C 266.770 138.520,266.098 140.299,265.406 142.167 C 264.982 143.313,264.419 144.831,264.155 145.542 L 263.675 146.833 269.069 146.833 L 274.463 146.833 275.077 145.125 C 275.414 144.185,275.831 143.042,276.003 142.583 C 276.174 142.125,276.624 140.861,277.003 139.774 C 277.381 138.687,277.731 137.693,277.780 137.565 C 277.856 137.367,279.536 137.338,288.711 137.374 L 299.552 137.417 300.358 139.667 C 300.802 140.904,301.554 143.023,302.030 144.375 L 302.896 146.833 308.281 146.833 C 311.243 146.833,313.667 146.803,313.667 146.766 C 313.667 146.709,310.275 137.613,309.590 135.833 C 309.152 134.696,308.330 132.503,305.840 125.833 C 304.454 122.121,303.240 118.896,303.143 118.667 C 302.977 118.274,299.561 109.170,299.051 107.761 C 298.659 106.677,296.842 101.850,296.256 100.333 C 295.954 99.554,295.311 97.848,294.827 96.542 L 293.946 94.167 288.658 94.167 L 283.371 94.167 281.576 98.958 M363.667 98.833 L 363.667 103.500 369.833 103.500 L 376.000 103.500 376.000 125.167 L 376.000 146.833 380.917 146.833 L 385.833 146.833 385.833 125.167 L 385.833 103.500 392.083 103.500 L 398.333 103.500 398.333 98.833 L 398.333 94.167 381.000 94.167 L 363.667 94.167 363.667 98.833 M252.484 103.902 C 257.277 105.126,259.700 110.074,258.039 115.250 C 256.723 119.352,254.582 120.367,247.042 120.462 L 242.000 120.526 242.000 111.994 L 242.000 103.463 246.708 103.546 C 250.298 103.610,251.670 103.695,252.484 103.902 M289.467 109.167 C 290.601 112.387,292.499 117.702,292.830 118.583 C 293.002 119.042,293.367 120.054,293.642 120.833 C 293.917 121.612,294.599 123.517,295.158 125.066 C 295.717 126.614,296.147 127.909,296.113 127.942 C 296.080 127.976,292.712 127.984,288.630 127.960 L 281.209 127.917 282.783 123.500 C 283.649 121.071,284.834 117.771,285.416 116.167 C 285.998 114.563,286.886 112.087,287.390 110.667 C 288.544 107.414,288.663 107.106,288.734 107.185 C 288.766 107.221,289.095 108.112,289.467 109.167 "
                    stroke="none"
                    fill="#04ac9c"
                    fillRule="evenodd"
                  ></path>
                  <path
                    id="path1"
                    d="M17.552 27.014 C 4.129 28.226,-0.266 43.398,10.500 51.354 C 12.235 52.636,15.270 54.121,19.833 55.920 C 27.057 58.769,29.722 61.586,29.683 66.333 C 29.640 71.606,25.602 75.167,19.667 75.167 C 14.306 75.167,9.645 71.860,7.988 66.882 C 7.797 66.305,7.620 65.833,7.595 65.833 C 7.571 65.833,6.958 66.121,6.234 66.472 C 5.509 66.823,4.373 67.365,3.708 67.675 C 2.337 68.317,2.356 68.262,2.919 69.938 C 8.133 85.472,33.043 84.826,35.922 69.083 C 36.756 64.526,35.631 60.193,32.814 57.106 C 30.568 54.646,27.856 53.070,20.755 50.097 C 13.231 46.947,10.833 44.616,10.833 40.452 C 10.833 31.128,24.692 30.113,29.250 39.102 C 29.617 39.825,29.933 40.446,29.954 40.481 C 29.990 40.544,30.933 40.067,33.500 38.686 C 34.959 37.901,34.943 38.006,33.924 35.917 C 31.482 30.910,26.746 27.511,21.622 27.087 C 20.959 27.032,20.117 26.962,19.750 26.931 C 19.383 26.901,18.394 26.938,17.552 27.014 M64.068 27.165 C 51.133 28.982,42.153 39.591,41.874 53.386 C 41.551 69.350,52.592 81.167,67.833 81.167 C 84.240 81.167,96.054 66.720,93.576 49.688 C 91.437 34.996,78.517 25.135,64.068 27.165 M122.415 27.163 C 114.107 28.338,106.941 33.429,103.177 40.831 C 98.535 49.960,99.186 61.628,104.808 70.083 C 114.268 84.311,136.561 85.015,145.976 71.383 L 146.344 70.850 144.037 69.111 L 141.730 67.373 140.845 68.449 C 131.486 79.822,112.156 75.678,107.659 61.333 C 102.259 44.112,117.054 28.443,133.163 34.322 C 136.236 35.444,141.500 39.362,141.500 40.528 C 141.500 40.858,141.987 40.570,144.107 38.988 L 146.356 37.310 146.066 36.863 C 143.116 32.330,138.012 28.980,131.750 27.467 C 130.241 27.102,124.228 26.906,122.415 27.163 M184.924 31.038 C 182.800 36.538,181.829 39.047,181.583 39.667 C 181.258 40.489,179.765 44.355,178.333 48.083 C 176.293 53.396,175.211 56.192,174.269 58.583 C 173.944 59.408,173.349 60.946,172.948 62.000 C 171.249 66.459,168.762 72.903,167.578 75.917 C 167.182 76.925,166.672 78.237,166.446 78.833 C 166.219 79.429,165.981 80.048,165.916 80.208 C 165.806 80.480,166.026 80.500,169.207 80.500 L 172.616 80.500 172.910 79.792 C 173.072 79.402,173.304 78.821,173.425 78.500 C 173.547 78.179,173.904 77.242,174.218 76.417 C 174.532 75.592,175.342 73.436,176.019 71.627 L 177.250 68.336 189.360 68.335 L 201.471 68.333 201.961 69.625 C 202.231 70.335,203.265 73.073,204.259 75.708 L 206.065 80.500 209.449 80.500 C 211.311 80.500,212.833 80.451,212.833 80.392 C 212.833 80.332,212.297 78.888,211.642 77.183 C 210.987 75.478,210.122 73.221,209.720 72.167 C 209.318 71.112,208.735 69.612,208.425 68.833 C 208.115 68.054,207.587 66.704,207.252 65.833 C 206.918 64.962,206.427 63.688,206.161 63.000 C 205.895 62.313,205.073 60.175,204.334 58.250 C 203.595 56.325,202.625 53.813,202.178 52.667 C 201.732 51.521,201.091 49.871,200.755 49.000 C 200.419 48.129,199.927 46.854,199.661 46.167 C 199.395 45.479,198.571 43.342,197.831 41.417 C 197.091 39.492,196.106 36.942,195.643 35.750 C 195.180 34.558,194.584 33.021,194.320 32.333 C 194.055 31.646,193.544 30.333,193.185 29.417 L 192.531 27.750 189.380 27.705 L 186.228 27.660 184.924 31.038 M218.500 54.083 L 218.500 80.500 232.833 80.500 L 247.167 80.500 247.167 77.500 L 247.167 74.500 235.917 74.500 L 224.667 74.500 224.667 51.083 L 224.667 27.667 221.583 27.667 L 218.500 27.667 218.500 54.083 M70.846 33.431 C 79.661 34.914,85.624 41.262,87.246 50.890 C 87.457 52.139,87.354 56.711,87.082 58.167 C 82.945 80.361,52.999 80.555,48.566 58.417 C 45.688 44.046,57.200 31.136,70.846 33.431 M190.296 38.583 C 190.567 39.317,191.410 41.567,192.169 43.583 C 192.927 45.600,193.757 47.813,194.013 48.500 C 194.269 49.188,194.662 50.237,194.886 50.833 C 198.190 59.606,199.158 62.231,199.110 62.279 C 199.079 62.310,194.664 62.317,189.300 62.293 L 179.547 62.250 180.372 60.083 C 180.826 58.892,181.420 57.317,181.692 56.583 C 182.585 54.177,184.777 48.349,185.611 46.167 C 185.838 45.571,186.085 44.896,186.159 44.667 C 186.265 44.339,188.687 37.920,189.267 36.429 C 189.375 36.152,189.420 36.186,189.597 36.679 C 189.710 36.993,190.024 37.850,190.296 38.583 M126.667 160.025 C 118.762 160.680,113.496 166.038,113.506 173.417 C 113.516 180.092,117.662 184.589,127.250 188.322 C 135.620 191.581,138.351 194.046,138.617 198.583 C 139.332 210.798,120.411 211.630,116.824 199.542 C 116.708 199.152,116.598 198.833,116.578 198.833 C 116.558 198.833,115.374 199.397,113.947 200.087 L 111.353 201.340 111.612 202.212 C 116.426 218.422,142.463 218.174,144.917 201.894 C 146.249 193.057,142.326 188.187,129.833 183.166 C 125.305 181.346,123.288 180.176,121.772 178.489 C 118.161 174.473,119.763 168.208,124.839 166.498 C 130.318 164.652,135.865 167.098,138.424 172.487 C 138.992 173.682,138.741 173.706,141.601 172.179 C 144.021 170.888,143.933 171.053,143.116 169.340 C 140.013 162.831,133.987 159.419,126.667 160.025 M188.083 160.333 C 174.871 162.750,166.595 173.051,166.593 187.083 C 166.590 203.603,178.477 215.135,194.470 214.132 C 207.828 213.293,216.900 202.298,216.202 187.792 L 216.140 186.500 205.820 186.500 L 195.500 186.500 195.500 189.333 L 195.500 192.167 202.758 192.167 L 210.015 192.167 209.905 192.792 C 208.193 202.554,202.548 207.828,193.500 208.120 C 179.412 208.574,169.794 195.195,173.765 180.667 C 177.919 165.471,197.517 161.047,207.593 173.031 L 208.250 173.812 210.167 172.307 C 211.221 171.480,212.228 170.699,212.406 170.572 C 213.404 169.860,208.188 164.780,204.333 162.713 C 199.901 160.335,193.333 159.373,188.083 160.333 M30.000 187.093 L 30.000 213.520 39.458 213.455 C 47.209 213.402,49.175 213.342,50.349 213.124 C 63.044 210.763,70.533 201.142,70.553 187.167 C 70.568 176.209,66.108 167.949,57.833 163.612 C 52.966 161.060,50.345 160.667,38.232 160.667 L 30.000 160.667 30.000 187.093 M77.667 187.083 L 77.667 213.500 91.750 213.500 L 105.833 213.500 105.833 210.500 L 105.833 207.500 94.917 207.500 L 84.000 207.500 84.000 198.750 L 84.000 190.000 93.000 190.000 L 102.000 190.000 102.000 187.000 L 102.000 184.000 93.000 184.000 L 84.000 184.000 84.000 175.333 L 84.000 166.667 94.667 166.667 L 105.333 166.667 105.333 163.667 L 105.333 160.667 91.500 160.667 L 77.667 160.667 77.667 187.083 M224.000 187.083 L 224.000 213.500 227.167 213.500 L 230.333 213.500 230.333 192.500 C 230.333 179.508,230.393 171.500,230.490 171.500 C 230.576 171.500,231.657 172.981,232.891 174.792 C 234.125 176.602,235.370 178.421,235.658 178.833 C 235.945 179.246,237.409 181.383,238.910 183.583 C 242.544 188.907,243.351 190.087,246.006 193.960 C 248.545 197.665,258.141 211.703,258.878 212.792 L 259.357 213.500 262.512 213.500 L 265.667 213.500 265.667 187.083 L 265.667 160.667 262.583 160.667 L 259.500 160.667 259.500 181.667 C 259.500 198.359,259.457 202.665,259.292 202.661 C 259.177 202.658,258.522 201.814,257.835 200.786 C 256.732 199.133,253.590 194.527,250.363 189.833 C 249.765 188.963,248.709 187.425,248.018 186.417 C 247.327 185.408,246.220 183.796,245.559 182.833 C 244.898 181.871,243.773 180.221,243.059 179.167 C 241.323 176.605,234.070 166.009,232.619 163.917 C 231.983 163.000,231.235 161.894,230.957 161.458 L 230.450 160.667 227.225 160.667 L 224.000 160.667 224.000 187.083 M49.750 167.306 C 59.254 169.523,64.016 176.156,64.011 187.167 C 64.007 195.988,60.744 202.145,54.392 205.314 C 51.170 206.922,48.579 207.326,41.458 207.330 L 36.333 207.333 36.333 187.067 L 36.333 166.802 42.292 166.879 C 47.585 166.947,48.417 166.995,49.750 167.306 "
                    stroke="none"
                    fill="#040404"
                    fillRule="evenodd"
                  ></path>
                  <path
                    id="path2"
                    d=""
                    stroke="none"
                    fill="#0480a0"
                    fillRule="evenodd"
                  ></path>
                  <path
                    id="path3"
                    d=""
                    stroke="none"
                    fill="#0480a0"
                    fillRule="evenodd"
                  ></path>
                  <path
                    id="path4"
                    d=""
                    stroke="none"
                    fill="#0480a0"
                    fillRule="evenodd"
                  ></path>
                </g>
              </svg>
            </div>
            <DocumentRenderer
              document={page.socialImpactDesign.document}
              componentBlocks={Blocks()}
              renderers={Doc()}
            />
          </Gutter>
          <Divider />

          <Gutter>
            {studios && (
              <div id="studios">
                <h2 className="font-bold text-4xl">Social Impact Studios</h2>
                <div className="my-8 grid md:grid-cols-2 xl:grid-cols-3 xl:gap-5 xl:gap-y-10 lg:gap-2 text-grey">
                  {studios.map((item: Studio, i: number) => {
                    let borderColor = 'border-yellow';
                    if (item.initiatives[0] === 'gunviolence')
                      borderColor = 'border-purple';
                    else if (item.initiatives[0] === 'climate')
                      borderColor = 'border-leaf';
                    return (
                      <Link
                        href={`/studios/${item.key}`}
                        key={`studio-link-${i}`}
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
                            imageLabel="Studio"
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
                  })}
                </div>
              </div>
            )}
          </Gutter>
          <Divider />

          {/* Studio previews */}
          {page.featuredSemesters && page.featuredSemesters.length > 0 && (
            <>
              <Gutter>
                <div id="studio-previews">
                  <h2 className="font-bold text-4xl">
                    Upcoming Studios: Fall 2024
                  </h2>
                  <div className="my-8 grid md:grid-cols-2 xl:grid-cols-3 xl:gap-5 xl:gap-y-10 lg:gap-2 text-grey">
                    {page.featuredSemesters.map(
                      (semester: StudioPreview, i: number) => (
                        <StudioPreviewRenderer
                          semester={semester}
                          key={`studio-link-${i}`}
                          showBorder={true}
                        />
                      )
                    )}
                  </div>
                </div>
              </Gutter>
              <Divider />
            </>
          )}

          <Gutter>
            {page.projectSpotlight && (
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
                          key={`project-link-${i}`}
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

          {}
        </div>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const result = await Query(
    'undergraduates',
    `undergraduates {
        intro { document }
        introImage {
          publicId
        }
        introImageAltText
        introImageCaption
        socialImpactDesign { document }
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

        ogImage { 
            publicId
        }
        ogDescription
        studioPreviews
        featuredSemesters {
          name
          key
          studio {
              name
              key
          }
          initiatives
          courseNumber
          instructors {
              name
          }
          previewThumbnail {
            publicId
          }
          previewThumbAltText
          previewShortDescription
          previewVideo {
            file
          }
          captions {
            url
          }
          previewVideoThumbnail {
            publicId
          }
        }
      }
    `
  );
  const studios = (await Query(
    'studios',
    `studios(
      ${DefaultWhereCondition()},
      orderBy: {
          createdDate: desc
      },
      take: 3
    ) {
        name
        key
        shortDescription 
        thumbnail { 
            publicId
        }
        thumbAltText
        initiatives
    }`
  )) as Studio[];

  if (result.error) {
    return {
      props: {
        error: result.error,
        page: null,
      },
    };
  }

  const page = result[0] as UndergradPage;
  return {
    props: {
      page,
      studios,
    },
    revalidate: 1,
  };
}
