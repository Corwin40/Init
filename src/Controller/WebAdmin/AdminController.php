<?php

namespace App\Controller\WebAdmin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractController
{
    /**
     * @Route("/admin", name="web_admin_home")
     */
    public function index()
    {
        return $this->render('web_admin/admin/index.html.twig', []);
    }
}
