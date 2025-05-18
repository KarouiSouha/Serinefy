
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Mail, Lock, User } from 'lucide-react';

// const registerSchema = z.object({
//   name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
//   email: z.string().email("Adresse e-mail invalide"),
//   password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
//   confirmPassword: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
// }).refine(data => data.password === data.confirmPassword, {
//   message: "Les mots de passe ne correspondent pas",
//   path: ["confirmPassword"],
// });

// type RegisterFormValues = z.infer<typeof registerSchema>;

// interface RegisterFormProps {
//   onSubmit: (values: RegisterFormValues) => void;
// }

// const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
//   const form = useForm<RegisterFormValues>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Nom</FormLabel>
//               <FormControl>
//                 <div className="relative">
//                   <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input placeholder="Votre nom" className="pl-10" {...field} />
//                 </div>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Adresse e-mail</FormLabel>
//               <FormControl>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input placeholder="votre@email.com" className="pl-10" {...field} />
//                 </div>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Mot de passe</FormLabel>
//               <FormControl>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
//                 </div>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="confirmPassword"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Confirmer le mot de passe</FormLabel>
//               <FormControl>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
//                 </div>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit" className="w-full">S'inscrire</Button>
//       </form>
//     </Form>
//   );
// };

// export default RegisterForm;
import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';

const RegisterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient' // Default role is patient
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialty: ''
  });

  // For therapist fields
  const [showTherapistFields, setShowTherapistFields] = useState(false);
  const [specialty, setSpecialty] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');

  // Check if email looks like a therapist email
  const checkTherapistEmail = (email) => {
    if (email.toLowerCase().endsWith('@therapist.com')) {
      setShowTherapistFields(true);
      setFormData(prev => ({
        ...prev,
        role: 'therapist'
      }));
    } else {
      setShowTherapistFields(false);
      setFormData(prev => ({
        ...prev,
        role: 'patient'
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      specialty: ''
    };
    
    // Name validation
    if (!formData.name) {
      newErrors.name = "Le nom est requis";
      isValid = false;
    } else if (formData.name.length < 2) {
      newErrors.name = "Le nom doit contenir au moins 2 caractères";
      isValid = false;
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "L'adresse e-mail est requise";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Adresse e-mail invalide";
      isValid = false;
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
      isValid = false;
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      isValid = false;
    }
    
    // Therapist specific validations
    if (showTherapistFields) {
      if (!specialty) {
        newErrors.specialty = "La spécialité est requise pour les thérapeutes";
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Check if this is an email change to detect therapist account
    if (name === 'email') {
      checkTherapistEmail(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Prepare the data for submission
      const submitData = {
        ...formData,
        // Add therapist-specific fields if applicable
        ...(showTherapistFields && {
          specialty,
          experience,
          bio,
          password_confirmation: formData.confirmPassword // Laravel requires this name
        })
      };
      
      onSubmit(submitData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium">Nom</label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            name="name"
            placeholder="Votre nom"
            className="w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm placeholder:text-muted-foreground"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>
      
      <div className="space-y-1">
        <label className="text-sm font-medium">Adresse e-mail</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="email"
            name="email"
            placeholder="votre@email.com"
            className="w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm placeholder:text-muted-foreground"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        {showTherapistFields && (
          <p className="text-xs text-green-600">Compte thérapeute détecté. Veuillez remplir les informations supplémentaires ci-dessous.</p>
        )}
      </div>
      
      {showTherapistFields && (
        <>
          <div className="space-y-1">
            <label className="text-sm font-medium">Spécialité *</label>
            <input
              type="text"
              placeholder="Votre spécialité"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            />
            {errors.specialty && <p className="text-sm text-red-500">{errors.specialty}</p>}
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium">Années d'expérience</label>
            <input
              type="text"
              placeholder="Ex: 5 ans"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium">Biographie</label>
            <textarea
              placeholder="Décrivez votre parcours professionnel"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>
        </>
      )}
      
      <div className="space-y-1">
        <label className="text-sm font-medium">Mot de passe</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className="w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm placeholder:text-muted-foreground"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
      </div>
      
      <div className="space-y-1">
        <label className="text-sm font-medium">Confirmer le mot de passe</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            className="w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm placeholder:text-muted-foreground"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
      </div>
      
      <button 
        type="submit" 
        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        S'inscrire
      </button>
    </form>
  );
};

export default RegisterForm;