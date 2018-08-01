import LocalizedStrings from "react-localization";

let strings = new LocalizedStrings({
    en: {
        "welcome": "Welcome",
        "main_description": "This application allows you to modify your profile as well as buy LODE coins or commit silver for delivery to the vault.",
        "dashboard": "Dashboard",
        "loggedin": "Logged in as ",
        "latest_news": "News",
        "recent_transactions": "Recent Transactions",
        "activity": "Activity",
        "logout": "Logout",
        "your_profile": "Profile",
        "buy": "Buy",
        "deliver": "Deliver",
        "silver": "Silver",
        "update_info": "Update Info",
        "update_password": "Looking to update your password?",
        "cancel": "Cancel",
        "goback": "Go Back",
        "commit": "Commit",
        "confirm": "Confirm Order",
        "confirm_text": "You are now about to confirm your order for [x] ounce(s)",
        "newsletter": "Keep me informed with the LODE newsletter",
        "announcements": "I want to stay up to date with General Announcements",
        "fname": "First Name",
        "lname": "Last Name",
        "phone": "Phone",
        "lang": "Language",
        "back_dashboard": "Back To Dashboard",
        "success_profile": "Success! Your profile has been updated",
        "success_buy": "Thank you for submitting your buy request for [x] ounces, an email with instructions from SWP will arrive shortly, welcome to the LODE Community, The creators of the first cryptographic Silver Money. ",
        "success_deliver": "Thank you for submitting your deliver request, an email with instructions from SWP will arrive shortly, welcome to the LODE Community, The creators of the first cryptographic Silver Money. ",
        "date": "Date",
        "details": "Details",
        "buy_lode_coins": "Buy Silver",
        "buy_lode_text": "You are now in the BUY section. If you do not want to buy silver, but want to deliver silver instead <a href=\"/deliver\">click here to go to the deliver section</a>",
        "enter_ounces": "Enter the number of ounces you wish to buy.",
        "ounces": "Ounces",
        "deliver_silver": "Deliver Silver To The Vault",
        "deliver_silver_text": "You are now in the DELIVER section. If you do not have silver to deliver, but want to buy silver instead <a href=\"/buy\">click here to go to the buy section</a>",
        "quantity": "Quantity",
        "quantity_text": "Number Of Pieces",
        "weight": "Weight",
        "total_weight": "Total Weight",
        "weight_text": "Weight per peice",
        "brand": "Brand or Description",
        "brand_text": "Type the brand here, e.g. RCM",
        "published": "published on",
        "city": "City",
        "province": "State/Province",
        "country": "Country",
        "address": "Address",
        "address2": "Address Line 2",
        "postal": "Postal Code",
        "sendnotice": "Send Notice",
        "metaltype": "Metal Type",
        "buydisclaimer": "By committing my items, I do declare that it is my intention to participate in the LC Community Plan of Arrangement. I understand clearly that the LC Community Plan of Arrangement and objective is to create a Global Centrally Organized Distributed Entity (CODE). I am clear that the LC intends to tokenize silver bullion as a CODE upon a blockchain. I agree that I will be contacted with further delivery instructions. I agree with the Terms Of Agreement and the Privacy Policy listed at the bottom of this website.",
        "deldiclaimer": "By committing my items, I do declare that it is my intention to participate in the LC Community Plan of Arrangement. I understand clearly that the LC Community Plan of Arrangement and objective is to create a Global Centrally Organized Distributed Entity (CODE). I am clear that the LC intends to tokenize silver bullion as a CODE upon a blockchain. I agree that I will be contacted with further delivery instructions. I agree with the Terms Of Agreement and the Privacy Policy listed at the bottom of this website.",
        "privacy_policy": "Privacy Policy",
        "terms_of_service": "Terms Of Service",
        "details_order": "Details For Order",
        "grams": "Grams",
        "description": "Description",
        "confirmed": "Confirmed",
        "gold": "Gold",
        "add_item": "Add An Item",
        "your_items": "Your Items",
        "min_deliver": "min delivery",
        "add_list": "Add To List",
        "add_one": "Please add at least one item to the list.",
        "err_num_weight": "Please enter a numeric weight",
        "err_pos_weight": "Please enter a positive weight value",
        "err_weight": "Please enter a weight",
        "err_brand": "A brand or description of the item is required",
        "err_qty": "Please enter a quantity",
        "err_num_qty": "Please enter a numeric quantity",
        "err_pos_qty": "Please enter a positive quantity",
        "err_profile": "Your profile has not been completely filled out. Please fill in your profile to place a buy order.",
        "err_min_commit": "Sorry, you must commit at least [x] ounces of [y] at one time.",
        "err_num_ounces": "Amount of ounces is not numeric. Numbers only please.",
        "err_min_ounces": "Minimum order of 100 ounces required.",
        "err_agree": "You must agree to the terms and conditions to continue",
        "err_phone_conf": "Your phone number has not been validated, our system cannot accept orders until this step has been completed. Click <a href=\"/smsverify\">here</a> to verify your phone number.",
        "confirm_title": "Confirm Your Phone number",
        "confirm_phone_text": "Use this form to confirm your phone number. You can send the code to your phone with the \"Send Code\" button below.",
        "btn_verify": "Verify Your Phone Number",
        "btn_resend": "Resend Code",
        "btn_send": "Send Code",
        "sms_code": "SMS Code",
        "err_sms_code": "Please enter a SMS code",
        "enter_sms_code": "Enter SMS Code",
        "err_phone_num": "Your phone number is not valid. Please update it and try again.",
        "err_phone_code": "SMS code is not valid. Click the \"Send Code\" button to have a new one sent to your phone.",
        "err_phone_num2": "Your phone number cannot be verified as your region has not yet been enabled by the service provider.",
        "verify_success": "Success! Your phone number has now been verified.",
        "resend_success": "Success! Please check your phone for a new SMS code.",
        "password_reset": "Your password has been reset.",
        "reset_password": "Reset Password",
        "click_login": "Click Here To Login.",
        "err_password_match": "Your passwords do not match",
        "err_password_valid": "Password must be at least one uppercase letter, one lowercase letter, one number and one special character",
        "forgot_password": "Forgot Password",
        "success": "Success!",
        "your_password": "Your Password",
        "renter_password": "Please re-enter your password.",
        "enter_password": "Please enter your password.",
        "repeat_password": "Repeat Password",
        "total_ounces": "Total (Oz)",
        "total_grams": "Total (g)",
        "recent_activity": "Activity",
        "signin": "Sign In",
        "register": "Register",
        "trouble": "Trouble logging in?",
        "noaccount": "Don't Have An Account Yet?",
        "createaccount": "Create An Account",
        "useroremail": "User Or Email",
        "password": "Password",
        "email": "Email",
        "username": "Username",
        "register_title": "Please fill in the following information",
        "register_sub_title": "Enter your account information below. All fields are required.",
        "icertify": "I certify that i am 18 years of age or older.",
        "viewall": "View all",
        "no_activity": "There is no activity to display",
        "view": "view",
        "click_here": "Click here",
        "account_activated": "Your Account Has Been Activated",
        "thanks_activated": "Thank you, your account has been activated",
        "system_label": "System",
        "external_label": "External",
        "please_choose": "Please choose",
        "more": "more",
        "update_password_button": "Update password",
        "download": "Downloads",
        "regerr_invalid_email": "Please enter a valid email",
        "regerr_invalid_fname": "Please enter a valid first name (2-20 characters, alpha characters only)",
        "regerr_invalid_lname": "Please enter a valid last name (2-20 characters, alpha characters only)",
        "regerr_invalid_city": "Please enter a city",
        "regerr_invalid_address": "Please enter a address",
        "regerr_invalid_postal": "Please enter a postal code",
        "regerr_invalid_username": "Please enter a valid username, you have too many special characters",
        "files": "Files",
        "no_files": "No files available for download",
        "read_accept_terms": "I have read and accept the <a href=\"https://www.lode.one/privacy-policy\">Privacy Policy</a>, <a href=\"https://www.lode.one/cookies-policy\">Cookies Policy</a>, <a href=\"https://www.lode.one/legal-disclaimer\">Legal Disclaimer</a>, and <a href=\"https://www.lode.one/terms-service\">Terms of Service</a>.",
        "alert_no_gdpr_consent": "Please accept the legal disclaimer and policies at the bottom of the profile page to continue the use of our site.",
        "cookies_policy": "Cookies Policy",
        "legal_disclaimer": "Legal Disclaimer"
    },
    fr: {
        "welcome": "Bienvenue",
        "main_description": "La présente application vous permet de modifier votre profil ainsi que d'acheter des LODE coins ou d'engager de l'argent métal pour le livrer au coffre.",
        "dashboard": "Tableau de bord",
        "loggedin": "Connecté en tant que ",
        "latest_news": "Actualités",
        "recent_transactions": "Transactions récentes",
        "activity": "Activité",
        "logout": "Déconnexion",
        "your_profile": "Profil",
        "buy": "Acheter",
        "deliver": "Livrer",
        "silver": "Argent",
        "update_info": "Mise à jour des données",
        "update_password": "Souhaitez-vous mettre votre mot de passe à jour ?",
        "cancel": "Annuler",
        "goback": "Retour",
        "commit": "Engager",
        "confirm": "Confirmer la commande",
        "confirm_text": "Vous êtes sur le point de confirmer votre commande pour [x] once(s)",
        "newsletter": "Je souhaite être tenu informé par l'infolettre LODE",
        "announcements": "Je désire demeurer en contact, recevoir les mises à jour et annonces générales",
        "fname": "Prénom",
        "lname": "Nom de famille",
        "phone": "Téléphone",
        "lang": "Langue",
        "back_dashboard": "Retour au tableau de bord",
        "success_profile": "Réussi ! Votre profil a été mis à jour",
        "success_buy": "Nous vous remercions pour votre demande d'achat de [x] onces, un courriel avec les instructions de SWP vous parviendra sous peu, bienvenue au sein de la communauté LODE, Les créateurs du premier système d'argent métal cryptographique. ",
        "success_deliver": "Nous vous remercions pour votre demande de livraison de [x] onces, un courriel avec les instructions de SWP vous parviendra sous peu, bienvenue au sein de la communauté LODE, Les créateurs du premier système d'argent métal cryptographique. ",
        "date": "Date",
        "details": "Détails",
        "buy_lode_coins": "Acheter de l'argent métal",
        "buy_lode_text": "Vous êtes maintenant à la section ACHETER. Si vous ne souhaitez pas acheter d'argent, mais plutôt livrer celui que vous détenez déjà, <a href=\"/deliver\">cliquez ici pour accéder à la section Livrer</a>",
        "enter_ounces": "Précisez le nombre d'onces que vous souhaitez acheter.",
        "ounces": "Onces",
        "deliver_silver": "Livrer l'argent métal au coffre",
        "deliver_silver_text": "Vous êtes maintenant à la section LIVRAISON. Si vous ne détenez pas d'argent métal à livrer, mais souhaitez en acheter, <a href=\"/buy\">cliquez ici pour accéder à la section Acheter</a>",
        "quantity": "Quantité",
        "quantity_text": "Nombre de pièces",
        "weight": "Poids",
        "total_weight": "Poids total",
        "weight_text": "Poids unitaire",
        "brand": "Marque ou description",
        "brand_text": "Indiquez la marque ici, p. ex. RCM",
        "published": "publiée sur",
        "city": "Ville",
        "province": "État/Province",
        "country": "Pays",
        "address": "Adresse",
        "address2": "Complément d'adresse",
        "postal": "Code postal",
        "sendnotice": "Envoyer les notifications",
        "metaltype": "Type de métal",
        "buydisclaimer": "Par mon engagement, je déclare avoir l'intention de participer au projet commun LODE Collective (LC). Je comprends parfaitement que l'objectif du projet commun LC vise à créer une organisation global centralisée (CODE). Je comprends parfaitement que le LC vise à « tokéniser » des lingots d'argent sous CODE sur une chaîne de blocs. Je consens à être contacté avec des instructions de livraison complémentaires. Je marque mon accord sur les Modalités de la convention et la Politique de confidentialité formulées au bas du présent site.",
        "deldiclaimer": "Par mon engagement, je déclare avoir l'intention de participer au projet commun LODE Collective (LC). Je comprends parfaitement que l'objectif du projet commun LC vise à créer une organisation global centralisée (CODE). Je comprends parfaitement que le LC vise à « tokéniser » des lingots d'argent sous CODE sur une chaîne de blocs. Je consens à être contacté avec des instructions de livraison complémentaires. Je marque mon accord sur les Modalités de la convention et la Politique de confidentialité formulées au bas du présent site.",
        "privacy_policy": "Politique de confidentialité",
        "terms_of_service": "Conditions d'utilisation",
        "details_order": "Détails pour la commande",
        "grams": "Grammes",
        "description": "Description",
        "confirmed": "Confirmé",
        "gold": "Or",
        "add_item": "Ajouter un article",
        "your_items": "Vos articles",
        "min_deliver": "livraison minimum",
        "add_list": "Ajouter à la liste",
        "add_one": "Veuillez ajouter au moins un article à la liste.",
        "err_num_weight": "Veuillez saisir un poids numérique",
        "err_pos_weight": "Veuillez saisir un poids positif",
        "err_weight": "Veuillez saisir un poids",
        "err_brand": "Veuillez saisir une marque",
        "err_qty": "Veuillez saisir une quantité",
        "err_num_qty": "Veuillez saisir une quantité numérique",
        "err_pos_qty": "Veuillez saisir une quantité positive",
        "err_profile": "Votre profil n'a pas été entièrement complété. Veuillez le compléter pour placer un ordre d'achat.",
        "err_min_commit": "Désolé, vous devez vous engager pour au moins [x] onces d'[y] à la fois.",
        "err_num_ounces": "La quantité d'onces n'est pas une valeur numérique. Uniquement en chiffres SVP.",
        "err_min_ounces": "Commande de minimum 100 onces requise.",
        "err_agree": "Vous devez accepter les conditions générales pour poursuivre",
        "err_phone_conf": "Votre n° de téléphone n'a pas été validé. Notre système ne peut accepter de commandes sans que cette étape ne soit franchie. Veuillez <a href=\"/smsverify\">cliquer ici</a> pour vérifier votre n° de téléphone.",
        "confirm_title": "Confirmez votre n° de téléphone",
        "confirm_phone_text": "Veuillez compléter ce formulaire pour confirmer votre n° de téléphone. Si vous n'avez pas encore reçu de message texte, vous pouvez envoyer le code avec le bouton \"Envoyer du code\" ci-dessous.",
        "btn_verify": "Vérifier votre n° de téléphone",
        "btn_resend": "Renvoi du code",
        "btn_send": "Envoyer du code",
        "sms_code": "Code SMS",
        "err_sms_code": "Veuillez saisir le code SMS",
        "enter_sms_code": "Saisir le code SMS",
        "err_phone_num": "Votre n° de téléphone n'est pas valide. Veuillez le mettre à jour et réessayer.",
        "err_phone_code": "Le code SMS n'est pas valide. Veuillez cliquer sur le bouton \"Envoyer du code\" pour en obtenir un nouveau sur votre téléphone.",
        "err_phone_num2": "Votre n° de téléphone ne peut être vérifié car votre région n'a pas encore été activée par le prestataire de services.",
        "verify_success": "Réussi ! Votre n° de téléphone a été vérifié.",
        "resend_success": "Réussi ! Le nouveau code SMS se trouve sur votre téléphone.",
        "password_reset": "Votre mot de passe a été réinitialisé.",
        "reset_password": "Réinitialisé de passe",
        "click_login": "Veuillez cliquer ici pour vous connecter.",
        "err_password_match": "Vos mots de passe ne correspondent pas",
        "err_password_valid": "Le mot de passe doit être composé d'au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
        "forgot_password": "Mot de passe oublié",
        "success": "Réussi !",
        "your_password": "Votre mot de passe",
        "renter_password": "Veuillez ressaisir votre mot de passe.",
        "enter_password": "Saisir votre mot de passe.",
        "repeat_password": "Saisir à nouveau le mot de passe",
        "total_ounces": "Total (Oz)",
        "total_grams": "Total (g)",
        "recent_activity": "Activité",
        "signin": "Se Connecter",
        "register": "Registre",
        "trouble": "Problème de connexion?",
        "noaccount": "Je n'ai pas encore de compte?",
        "createaccount": "Créer Un Compte",
        "useroremail": "Utilisateur ou Email",
        "password": "de Passe",
        "email": "Courriel",
        "username": "Nom d'utilisateur",
        "register_title": "Veuillez compléter les informations suivantes",
        "register_sub_title": "Veuillez saisir votre compte ci-dessous. Tous les champs sont requis.",
        "icertify": "Je certifie être âgé(e) de 18 ans ou plus.",
        "viewall": "Voir tout",
        "no_activity": "Aucune activité à afficher",
        "view": "visualiser",
        "click_here": "Cliquer ici",
        "account_activated": "Votre compte a été activé.",
        "thanks_activated": "Merci, votre compte a été activé.",
        "system_label": "Système",
        "external_label": "Externe",
        "please_choose": "Choisissez l'option",
        "more": "plus",
        "update_password_button": "Mise à jour du mot de passe",
        "download": "Téléchargements",
        "regerr_invalid_email": "Veuillez saisir une adresse courriel valide",
        "regerr_invalid_fname": "Veuillez saisir un prénom valide (2 à 20 lettres uniquement)",
        "regerr_invalid_lname": "Veuillez saisir un nom valide (2 à 20 lettres uniquement)",
        "regerr_invalid_city": "Veuillez saisir un nom valide (2 à 20 lettres uniquement)",
        "regerr_invalid_address": "Veuillez saisir une adresse",
        "regerr_invalid_postal": "Veuillez saisir une adresse",
        "regerr_invalid_username": "Veuillez saisir une adresse",
        "files": "Fichier",
        "no_files": "Aucuns fichiers à télécharger",
        "read_accept_terms": "J'ai lu et accepté la <a href=\"https://www.lode.one/privacy-policy\">politique de confidentialité</a>, <a href=\"https://www.lode.one/privacy-policy\">la politique de cookies</a>, <a href=\"https://www.lode.one/legal-disclaimer\">la clause de non-responsabilité légale</a> et <a href=\"https://www.lode.one/terms-service\">les conditions d'utilisation</a>.",
        "alert_no_gdpr_consent": "Veuillez accepter les mentions légales et les politiques en bas de la page de profil pour continuer l'utilisation de notre site.",
        "cookies_policy": "la politique de cookies",
        "legal_disclaimer": "la clause de non-responsabilité légale"
    },
    es: {
        "welcome": "Bienvenido",
        "main_description": "Esta aplicación le permite modificar su perfil así como comprar monedas Lode o entregar plata para su entrega a la bóveda.",
        "dashboard": "Panel",
        "loggedin": "Conectado como",
        "latest_news": "Noticias",
        "recent_transactions": "Transacciones Recientes",
        "activity": "Actividad",
        "logout": "Cerrar Sesion",
        "your_profile": "Perfil",
        "buy": "Comprar",
        "deliver": "Entregar",
        "silver": "Plata",
        "update_info": "Actualizar Info",
        "update_password": "¿Quiere actualizar su contraseña?",
        "cancel": "Cancelar",
        "goback": "Regresar",
        "commit": "Entregar",
        "confirm": "Confirmar Orden",
        "confirm_text": "Usted está a punto de confirmar su orden de [x] onza(s)",
        "newsletter": "Manténganme informado con el boletín de Lode",
        "announcements": "Deseo estar actualizado en avances generales",
        "fname": "Primer Nombre",
        "lname": "Apellido",
        "phone": "Teléfono",
        "lang": "Idioma",
        "back_dashboard": "Volver al Panel",
        "success_profile": "Actualización Exitosa! Su perfil ha sido actualizado",
        "success_buy": "Gracias por enviar su requerimiento de compra de [x] onzas, pronto le llegará un correo electrónico de SWP con instrucciones, bienvenido a la Comunidad LODE, los creadores de la primera moneda criptográfica de plata.",
        "success_deliver": "Gracias por enviar su requerimiento de entrega, pronto le llegará un correo electrónico de SWP con instrucciones, bienvenido a la Comunidad LODE, los creadores de la primera moneda criptográfica de plata.",
        "date": "Fecha",
        "details": "Detalles",
        "buy_lode_coins": "Comprar Plata",
        "buy_lode_text": "Usted se encuentra en la sección COMPRAR. Si usted no quiere comprar plata, pero en cambio, quiere entregar plata <a href=\"/deliver\">haga clic aquí para ir a la sección entregar</a>",
        "enter_ounces": "Ingrese el número de onzas que desea comprar.",
        "ounces": "Onzas",
        "deliver_silver": "Entregar Plata a la Bóveda",
        "deliver_silver_text": "Usted se encuentra en la sección ENTREGAR. Si usted no tiene plata para entregar, pero en cambio, quiere comprar plata <a href=\"/buy\">haga clic aquí para ir a la sección comprar</a>",
        "quantity": "Cantidad",
        "quantity_text": "Número de Piezas",
        "weight": "Peso",
        "total_weight": "Peso Total",
        "weight_text": "Peso por pieza",
        "brand": "Marca o Descripción",
        "brand_text": "Teclee la marca aquí, ej. RCM",
        "published": "publicado el",
        "city": "Ciudad",
        "province": "Estado/Provincia",
        "country": "País",
        "address": "Dirección",
        "address2": "Línea de Dirección 2",
        "postal": "Código Postal",
        "sendnotice": "Enviar Aviso",
        "metaltype": "Tipo de Metal",
        "buydisclaimer": "Al entregar mis artículos, declaro que es mi intención participar en el Plan de Arreglo de la Comunidad LC. Entiendo perfectamente que el Plan de Arreglo y el objetivo de la Comunidad LC es crear una Entidad Distribuida Centralmente Organizada Global (CODE). Tengo claro que LC pretende tokenizar los lingotes de plata como un CODE sobre un blockchain. Estoy de acuerdo en ser contactado para instrucciones futuras de entrega. Estoy de acuerdo con los Términos del Acuerdo y la Política de Privacidad listados en la parte de abajo de este sitio web.",
        "deldiclaimer": "Al entregar mis artículos, declaro que es mi intención participar en el Plan de Arreglo de la Comunidad LC. Entiendo perfectamente que el Plan de Arreglo y el objetivo de la Comunidad LC es crear una Entidad Distribuida Centralmente Organizada Global (CODE). Tengo claro que LC pretende tokenizar los lingotes de plata como un CODE sobre un blockchain. Estoy de acuerdo en ser contactado para instrucciones futuras de entrega. Estoy de acuerdo con los Términos del Contrato y la Política de Privacidad listados en la parte de abajo de este sitio web.",
        "privacy_policy": "Política de privacidad y cookies",
        "terms_of_service": "Términos de Servicio",
        "details_order": "Detalles del Pedido",
        "grams": "Gramos",
        "description": "Descripción",
        "confirmed": "Confirmado",
        "gold": "Oro",
        "add_item": "Agregue un Artículo",
        "your_items": "Sus Artículos",
        "min_deliver": "entrega mínima",
        "add_list": "Agregar a la lista",
        "add_one": "Por favor agregue al menos un artículo a la lista.",
        "err_num_weight": "Por favor ingrese un peso numérico",
        "err_pos_weight": "Por favor ingrese un valor de peso positivo",
        "err_weight": "Por favor ingrese un peso",
        "err_brand": "Se require una marca o descripción del artículo",
        "err_qty": "Por favor ingrese una cantidad",
        "err_num_qty": "Por favor ingrese una cantidad numérica",
        "err_pos_qty": "Por favor ingrese una cantidad positiva",
        "err_profile": "Su perfil no se ha completado en su totalidad. Por favor complete su perfil para hacer un pedido de compra.",
        "err_min_commit": "Lo sentimos, usted debe entregar al menos [x] onzas de [y] a la vez.",
        "err_num_ounces": "La cantidad de onzas no es numérica. Sólo números por favor.",
        "err_min_ounces": "Se requiere un pedido mínimo de 100 onzas.",
        "err_agree": "Usted debe estar de acuerdo con los términos y condiciones para continuar",
        "err_phone_conf": "Su número telefónico no ha sido validado, nuestro sistema no puede aceptar órdenes hasta que este paso esté completo. Haga clic <a href=\"/smsverify\">here</a> para verificar su número telefónico.",
        "confirm_title": "Confirme Su Número Telefónico",
        "confirm_phone_text": "Use esta forma para confirmar su número telefónico. Usted puede enviar el código a su teléfono con el botón “Enviar Código” que aparece abajo.",
        "btn_verify": "Verifique Su Número Telefónico",
        "btn_resend": "Reenviar Código",
        "btn_send": "Enviar Código",
        "sms_code": "Código SMS",
        "err_sms_code": "Por favor ingrese el código SMS",
        "enter_sms_code": "Ingrese el Código SMS",
        "err_phone_num": "Su número telefónico no es válido. Por favor actualícelo e inténtelo de nuevo.",
        "err_phone_code": "El código SMS no es válido. Haga clic en el botón \"Enviar Código\" para que se envíe uno nuevo a su teléfono.",
        "err_phone_num2": "Su número telefónico no puede ser verificado debido a que su región no ha sido habilitada por el proveedor del servicio.",
        "verify_success": "Verificación exitosa! Su número telefónico ha sido verificado.",
        "resend_success": "Envío exitoso! Por favor revise su Nuevo código SMS en su teléfono.",
        "password_reset": "Su contraseña ha sido reseteada.",
        "reset_password": "Resetear Contraseña",
        "click_login": "Haga clic aquí para iniciar sesión.",
        "err_password_match": "Sus contraseñas no coinciden",
        "err_password_valid": "La contraseña debe contener al menos una letra en mayúsculas, una en minúsculas, un número y un caracter especial",
        "forgot_password": "He olvidado mi contraseña",
        "success": "Completado con éxito!",
        "your_password": "Su Contraseña",
        "renter_password": "Por favor reingrese su contraseña.",
        "enter_password": "Por favor ingrese su contraseña.",
        "repeat_password": "Repetir Contraseña",
        "total_ounces": "Total (Oz)",
        "total_grams": "Total (g)",
        "recent_activity": "Actividad reciente",
        "signin": "Iniciar sesión",
        "register": "Regístrate",
        "trouble": "¿Tiene problemas para ingresar?",
        "noaccount": "¿No tiene una cuenta?",
        "createaccount": "Cree una",
        "useroremail": "Usuario o Correo electrónico",
        "password": "Contraseña",
        "email": "Correo electrónico",
        "username": "Nombre de usuario",
        "register_title": "Por favor proporcione la siguiente información",
        "register_sub_title": "Ingrese a continuación la información de su cuenta. Todos los campos son requeridos.",
        "icertify": "Declaro que tengo 18 años de edad o más.",
        "viewall": "ver todo",
        "no_activity": "No hay actividades que mostrar",
        "view": "ver",
        "click_here": "haga clic aquí",
        "account_activated": "Su Cuenta ha sido activada",
        "thanks_activated": "¡Gracias! Su cuenta ha sido activada",
        "system_label": "Sistema",
        "external_label": "Externo",
        "please_choose": "Por favor elija",
        "more": "leer más",
        "update_password_button": "Actualizar Contraseña",
        "download": "Descargas",
        "regerr_invalid_email": "Ingrese un correo electrónico válido",
        "regerr_invalid_fname": "Por favor ingrese un primer nombre válido (2-20 caracteres, solo caracteres alfa)",
        "regerr_invalid_lname": "Por favor ingrese un primer nombre válido (2-20 caracteres, solo caracteres alfa)",
        "regerr_invalid_city": "Por favor, ingrese una ciudad",
        "regerr_invalid_address": "Por favor, ingrese una ciudad",
        "regerr_invalid_postal": "Por favor, ingrese una ciudad",
        "regerr_invalid_username": "Por favor, ingrese un usuario válido, tiene muchos caracteres especiales",
        "files": "Archivos",
        "no_files": "No hay archivos disponibles para descargar",
        "read_accept_terms": "He leído y acepto la <a href=\"https://www.lode.one/privacy-policy\">Política de Privacidad</a>, <a href=\"https://www.lode.one/privacy-policy\">Política de Cookies</a>, <a href=\"https://www.lode.one/legal-disclaimer\">Aviso Legal</a>, <a href=\"https://www.lode.one/terms-service\">y Términos del servicio</a>.",
        "alert_no_gdpr_consent": "Por favor, acepte nuestro aviso legal y políticas de privacidad que se encuentran al final de esta página, para poder continuar usando nuestro sitio web.",
        "cookies_policy": "Política de Cookies",
        "legal_disclaimer": "Aviso Legal"
    }
});
export default strings;