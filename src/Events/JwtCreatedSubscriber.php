<?php

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber
{
    public function updateJwtData(JWTCreatedEvent $event)
    {
        // 1. récuperer l'utilisateur
        $user = $event->getUser();
        // 2. Enrichir les datas pour qu'elles contiennent ces données
        $data = $event->getData();
        $data['id'] = $user->getId();
        $data['firstname'] = $user->getFirstname();
        $data['lastname'] = $user->getLastname();

        $event->setData($data);
    }
}