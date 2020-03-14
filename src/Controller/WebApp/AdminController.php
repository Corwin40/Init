<?php

namespace App\Controller\WebApp;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractController
{
    /**
     * @Route("/admin", name="web_admin_home")
     */
    public function index()
    {
        return $this->render('web_app/admin/index.html.twig', []);
    }
}
