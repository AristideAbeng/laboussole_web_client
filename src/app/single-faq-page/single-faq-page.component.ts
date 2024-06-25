import { Component } from '@angular/core';

@Component({
  selector: 'app-single-faq-page',
  templateUrl: './single-faq-page.component.html',
  styleUrls: ['./single-faq-page.component.scss']
})
export class SingleFaqPageComponent {

  ngOnInit(){
    window.scrollTo(0,0);
  }
  faq: { question: string, answer: string }[] = [
    {
        question: "J'ai oublié mon mot de passe. Que dois-je faire ?",
        answer: "Cliquez sur le lien 'Mot de passe oublié' sur la page de connexion. Vous recevrez un e-mail avec des instructions pour réinitialiser votre mot de passe."
    },
    {
        question: "Je ne parviens pas à créer un compte. Que se passe-t-il ?",
        answer: "Assurez-vous de bien saisir toutes les informations requises et que votre adresse e-mail est valide. Si vous rencontrez toujours des problèmes, veuillez contacter notre équipe d'assistance."
    },
    {
        question: "Comment puis-je trouver [fonctionnalité spécifique de l'application] ?",
        answer: "Vous pouvez utiliser la barre de recherche pour trouver des fonctionnalités spécifiques de l'application. Vous pouvez également explorer les différentes sections de l'application en utilisant le menu de navigation."
    },
    {
        question: "L'application est lente ou buggée. Que faire ?",
        answer: "Assurez-vous que vous utilisez la dernière version de l'application. Redémarrez votre appareil et essayez à nouveau. Si le problème persiste, veuillez contacter notre équipe d'assistance."
    },
    {
        question: "Je ne peux pas terminer un test ou un questionnaire. Que faire ?",
        answer: "Assurez-vous que vous avez une connexion Internet stable. Si vous rencontrez toujours des problèmes, veuillez contacter notre équipe d'assistance."
    },
    {
        question: "Mes résultats aux tests ne sont pas précis. Que faire ?",
        answer: "Les tests et questionnaires d'évaluation sont conçus pour vous donner une indication générale de vos intérêts et aptitudes. Il est important de prendre en compte d'autres facteurs lors de votre prise de décision, tels que vos valeurs personnelles et vos objectifs professionnels."
    },
    {
        question: "Je ne trouve pas d'informations sur la formation ou le métier qui m'intéresse. Que faire ?",
        answer: "Utilisez la barre de recherche pour trouver des informations spécifiques. Vous pouvez également parcourir les différentes catégories de formations et de métiers. Si vous ne trouvez toujours pas ce que vous recherchez, veuillez contacter notre équipe d'assistance."
    },
    {
        question: "Je ne peux pas m'inscrire à un cours en ligne. Que faire ?",
        answer: "Assurez-vous que vous avez un compte et que vous êtes connecté. Vérifiez également si vous avez les conditions requises pour suivre le cours. Si vous rencontrez toujours des problèmes, veuillez contacter notre équipe d'assistance."
    },
    {
        question: "Je ne parviens pas à accéder à une ressource. Que faire ?",
        answer: "Assurez-vous que vous avez une connexion Internet stable. Redémarrez votre appareil et essayez à nouveau. Si le problème persiste, veuillez contacter notre équipe d'assistance."
    },
    {
        question: "Comment puis-je contacter l'équipe d'assistance ?",
        answer: "Vous pouvez contacter notre équipe d'assistance en envoyant un e-mail à laboussolesangmelima@gmail.com, vous pouvez également nous contacter via whatsapp ou en appel normal à ce numéro +237 672435162."
    }
];

}
