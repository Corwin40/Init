<?php

namespace App\Controller\WebApp;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class PublicController extends AbstractController
{
    /**
     * @Route("/", name="web_app_public")
     */
    public function index()
    {
        return $this->render('web_app/public/index.html.twig', []);
    }
}
