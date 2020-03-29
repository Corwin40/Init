<?php

namespace App\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractController
{
    /**
     * @Route("/admin/", name="web_admin_home")
     */
    public function index()
    {
        return $this->render('Admin/index.html.twig', []);
    }
}
