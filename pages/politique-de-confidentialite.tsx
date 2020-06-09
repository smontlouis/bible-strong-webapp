import { Heading } from '@chakra-ui/core'
import Head from 'next/head'

export default function Page() {
  return (
    <div
      style={{
        backgroundImage: `url(${require('../images/background.jpg')})`,
        backgroundSize: 'contain',
        backgroundPosition: 'right',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        marginBottom: '50px',
        padding: '0 20px',
      }}
    >
      <Head>
        <title>Politique de confidentialité - Bible Strong App</title>
      </Head>
      <div
        style={{
          marginTop: 100,
          maxWidth: 500,
          margin: '20px auto',
        }}
      >
        <Heading as="h1" my={10}>
          Politique de confidentialité pour Bible Strong App
        </Heading>
        <p>
          L'une de nos principales priorités est la confidentialité de nos
          visiteurs. Ce document de politique de confidentialité contient des
          types d'informations qui sont collectées et enregistrées par Bible
          Strong App et comment nous les utilisons.
        </p>
        <p>
          Si vous avez des questions supplémentaires ou si vous souhaitez plus
          d'informations sur notre politique de confidentialité, n'hésitez pas à
          nous contacter par e-mail à l'adresse s.montlouis.calixte@gmail.com.
        </p>

        <Heading as="h2" my={10}>
          Fichiers de log
        </Heading>
        <p>
          Bible Strong App suit une procédure standard d'utilisation de fichiers
          journaux. Ces fichiers enregistrent les visiteurs lorsqu'ils visitent
          des sites Web. Toutes les sociétés d'hébergement le font et font
          partie des analyses des services d'hébergement. Les informations
          collectées par les fichiers journaux comprennent les adresses de
          protocole Internet (IP), le type de navigateur, le fournisseur d'accès
          Internet (FAI), l'horodatage de la date et de l'heure, les pages de
          renvoi / de sortie et éventuellement le nombre de clics. Celles-ci ne
          sont liées à aucune information personnellement identifiable. Les
          informations ont pour objectif d'analyser les tendances, d'administrer
          le site, de suivre les mouvements des utilisateurs sur le site Web et
          de collecter des informations démographiques.
        </p>

        <Heading as="h2" my={10}>
          Information des enfants
        </Heading>
        <p>
          Une autre partie de notre priorité consiste à ajouter une protection
          pour les enfants qui utilisent Internet. Nous encourageons les parents
          et les tuteurs à observer, participer et / ou surveiller et guider
          leur activité en ligne. Bible Strong App ne collecte pas sciemment
          d'informations personnelles identifiables sur des enfants de moins de
          13 ans. Si vous pensez que votre enfant a fourni ce type
          d'informations sur notre site Web, nous vous encourageons vivement à
          nous contacter immédiatement et nous ferons de notre mieux pour
          supprimer rapidement ces informations de nos archives.
        </p>
        <Heading as="h2" my={10}>
          Politique de confidentialité en ligne uniquement
        </Heading>

        <p>
          Cette politique de confidentialité s'applique uniquement à nos
          activités en ligne et est valable pour les visiteurs de notre site Web
          et notre application en ce qui concerne les informations qu'ils ont
          partagées et / ou collectées dans Bible Strong App. Cette politique ne
          s'applique pas aux informations collectées hors ligne ou via des
          canaux autres que notre application.
        </p>

        <Heading as="h2" my={10}>
          Consentement
        </Heading>
        <p>
          En utilisant notre site Web, vous acceptez par la présente notre
          politique de confidentialité et acceptez ses termes et conditions.
        </p>
      </div>
    </div>
  )
}
