![EL-Next logo logo](https://res.cloudinary.com/engagement-lab-home/image/upload/f_auto/v1699550434/github/logo-api.png)

# The Engagement Lab's NEXT Web Suite :beers:

![deployment status](https://img.shields.io/github/actions/workflow/status/engagementlab/el-next/deploy.yml?label=deploy&style=for-the-badge)

I'm a monorepo containing:

:desktop_computer: multiple apps built using the [Next.js](https://nextjs.org/) framework

:memo: a robust and highly customized CMS built on [Keystone v6.x](https://keystonejs.com/)

:clamp: an expressjs API for media management, deploying apps, etc.

:wrench: a shared react component library

:cloud_with_lightning: an Azure [cloud functions](https://azure.microsoft.com/en-us/products/functions) project

:whale: a Dockerfile and composer for managing all CMS, staging (QA) instances and reverse proxy using [traefik](https://traefik.io/traefik/)

### Repo structure

```
|- package.json => root workspace (private package used by preconstruct)
|-> apps/
|--- api/ => simple expressjs app exposing routes for API for media management, etc.
|--- cms/ => Keystone CMS app w/ multiple custom components
|--- elab/ => web app for Engagement Lab home (nextjs)
|--- tngvi/ => *[deprecated]* web app for Transforming Narratives of Gun Violence Initiative (nextjs)
|--- sjm/ => web app for Social Justice + Media Symposium (nextjs)
|-> packages/
|--- components/ => re-usable components usable in local nextjs app by importing from @el-next/components
|--- functions/ => Azure cloud functions project; handles deployments, newsletter, user profile management, elab.works/ links
-> proxy/ => traefik reverse proxy config files
-> scripts/ => bash scripts for performing various duties in our CI (github actions) environment and handling docker on QA/CMS server
```

### About our apps

![](https://res.cloudinary.com/engagement-lab-home/image/upload/c_scale,f_auto,w_150/v1547860877/logos/el-logo.svg)

###### Engagement Lab Home v3.x

The Engagement Lab at Emerson College website, showcasing our initiatives, events, news, a decade's worth of games and web apps, information about our studios, staff profiles, and more.

![Transforming Narratives of Gun Violence Initiative logo](https://res.cloudinary.com/engagement-lab-home/image/upload/c_scale,w_100/v1647967279/tngvi/logos/TNGVLogo.png)

###### Transforming Narratives of Gun Violence Initiative website _(deprecated)_

The Engagement Lab at Emerson College has partnered with the Gun Violence Prevention Center at Massachusetts General Hospital and the Louis D. Brown Peace Institute in a three-year initiative to transform narratives of gun violence. The website features videos, documentaries, information about studios, recent news, and information about events.

![Social Justice + Media Symposium logo](https://res.cloudinary.com/engagement-lab-home/image/upload/b_rgb:ffffff,c_scale,co_rgb:000000,f_auto,w_100/v1670009697/sjm/logos/sjm.png)

###### Social Justice + Media Symposium

An annual gathering of students, faculty, and stakeholders to explore how media practices and pedagogies can support equity, justice, and positive social change in daily life. The website information about events, awards, and partners.
