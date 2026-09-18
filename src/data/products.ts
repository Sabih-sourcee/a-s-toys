import { Product, Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'soft-dolls',
    name: 'Soft Dolls & Plush',
    slug: 'soft-dolls',
    description: 'Hypoallergenic, ultra-soft plushies and hand-stitched dolls for cuddle time.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-MDe4Ulbl4pHjt-sO9dlNplXf_eLl6qbPNATqjGDW6Iqq3N5lEbzJinnc1P7H0V_BPi8RtyhirrQ0LCZzkddZjADVr2NvqXBfZyYGAKniOyZx8EfvjMePF5QZv4_eZFWQOYixQvQ6ADn9PfFgy4wd2l8NABt7xjRMXn4bhvztLX5CXl4yDFOE_suK-HPJP2qTlPwDX7zsodb3NLxLHpYPRTsI9MOen3uUiDNuSd2gnsDE-a1N4wW2',
    itemCount: 16
  },
  {
    id: 'die-cast',
    name: 'Die-cast & Cars',
    slug: 'die-cast',
    description: 'Heavy alloy pullback racers, vintage roadsters, and construction vehicles.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL2f-kWV43rjIUdGyCk9dN2TdSeBAREsKQsIjwvRSgZUedube_El_3-ZN3AuhvDyPTsoST30NyFNzBt9pAVMdfGrw4NigWVm_MSrow7fHP1nbUNh7F1b1qvIF3HAZWiCA2qqw38-cxkmtE-X0csJf-IVpH-Qcpc8G1rp4tjnSDH4yolfm1Kyvv28eITZvc1A7O2a8xqPERe8xhiYYmOqQbLmB4L0Z-AxrSubmTUtN18DRGgqG-UpjJ',
    itemCount: 24
  },
  {
    id: 'wooden-montessori',
    name: 'Wooden & Montessori',
    slug: 'wooden-montessori',
    description: 'Open-ended developmental toys crafted with non-toxic dyes and sustainable timber.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9whh2ZiXOzYCs_wPHNCcBIg_UJuqIvqrzj6rh63MCydH0WVV4aPbj_oqIP4z5Xci95u02eRt066pEJSFGVGsvHcx_rKYolsEmNsIW7t1Lr3wZFiWhEWw4RyGceR8SDru6andWsT3olt9fKYk1swzo1kJ7ECAWqaJtS14hfdsN6-nDS9PjGh43becmL-YCBI-tZn9-ATDLhUQywa-0Y-aU5XYxidD2FXUMiprZYpOUA6O2XBRg5Hf-',
    itemCount: 19
  },
  {
    id: 'arts-craft',
    name: 'Arts, Clay & Craft',
    slug: 'arts-craft',
    description: 'Non-toxic washable watercolor cases, dough buckets, and safe sculpting tools.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUeFb6IJrHTrh8gWXYaJcKlOinai3k_xyDNPX4RAyqPJrspuIkG-ATQuPpu-j408VljCOllRIJkSOzpd30RQZrydng4XRtf8TTa2wyuwdiRNriyRuo5398jzV1bCmKafRXktYTUQzNUUgenrLPjfvBGEEnFTj71gxKQPf9IP7BhY_hijHN1Lk3sk4kMNW7J-H3AhlM4upf1LalusslASVMT_RYgUlKc6tPxGGxjCVXvh2sS8OYcsmH',
    itemCount: 14
  },
  {
    id: 'puzzles-brains',
    name: 'Puzzles & Brain Games',
    slug: 'puzzles-brains',
    description: 'Tactile problem-solving boards, tangrams, and geometric balance challenges.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtj0-gbUBy2ZaUg0jXH7sUeVDeU0XFHyD2SYtFQBc5zF35FC2GgIsH2_Id8zsKQCojQeso_iWUHYVxilBIadhFkoIzOI8NXB6aq9CT6APd3eiP6iBxBpTah-HsS_v1QJbI9V8jXdRYxDmM-FpJ2-oP2WYWiYdFUKiHBJiVQFbtOmHYrNp0-Qf-E3CD_zulGIZmeYNgNQFHuipztPCZO585JRvvL8mHRfdbbYpj70Nl8TmVGdBAiv-u',
    itemCount: 11
  },
  {
    id: 'baby-toddler',
    name: 'Baby & Toddler',
    slug: 'baby-toddler',
    description: 'Food-grade teether rattles, chime activity cubes, and smooth graspable toys.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCa1nF-qCexSg_Peysy5YOwhah6ve1eEC5aL5Cg9xuDJWY_OrooM6NbX5CIXTy7HeOIL0h_AWqam7OBECbMpzL3vnhvS_zgJz7UB0urWP6fpmEEc-R1Yg-HxWhcCdXKUNhQL3_i4zQVg4QEq28xFa_9XNa0cDpppI2p3jcGrMwPflVCi11gZNAF7kBSUFhgCLFxiEZdWaSeyl7_Bvj5WLdOmvZsY4eDowHnu4V_KWVgtPUlqqFAMd0J',
    itemCount: 18
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'ast-001',
    title: 'Wooden Rainbow Stacking Arch',
    slug: 'wooden-rainbow-stacking-arch',
    category: 'wooden-montessori',
    categoryName: 'Wooden & Montessori',
    ageRange: '1-3y',
    ageLabel: 'Ages 18m+',
    price: 2450,
    originalPrice: 2850,
    discountBadge: 'NEW ARRIVAL',
    badgeType: 'new',
    rating: 4.9,
    reviewsCount: 18,
    stock: 14,
    inStock: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPqTCjsN_i77w7jIGjtWOIxDAcZP2FDZdax5_UB990q0MZexMJwZHhMnZl5EreZnGsJYztvqTMkcuQNKhrWTuWemOVmlqzUC1DUKt0a1LNVJPWQC-w1l3nhfxguan7TFXyuMP45kbIAckrmGppSLqg04ZOD6-dKnPulblmr48Cm1_Jofg3t85wGTJztWtYVWhQbb4JmzNC1nZFyPpjG5f6Q-guBG7qplUnu3d9qQuw6Q_U3yecdB-2',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDPqTCjsN_i77w7jIGjtWOIxDAcZP2FDZdax5_UB990q0MZexMJwZHhMnZl5EreZnGsJYztvqTMkcuQNKhrWTuWemOVmlqzUC1DUKt0a1LNVJPWQC-w1l3nhfxguan7TFXyuMP45kbIAckrmGppSLqg04ZOD6-dKnPulblmr48Cm1_Jofg3t85wGTJztWtYVWhQbb4JmzNC1nZFyPpjG5f6Q-guBG7qplUnu3d9qQuw6Q_U3yecdB-2',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA9whh2ZiXOzYCs_wPHNCcBIg_UJuqIvqrzj6rh63MCydH0WVV4aPbj_oqIP4z5Xci95u02eRt066pEJSFGVGsvHcx_rKYolsEmNsIW7t1Lr3wZFiWhEWw4RyGceR8SDru6andWsT3olt9fKYk1swzo1kJ7ECAWqaJtS14hfdsN6-nDS9PjGh43becmL-YCBI-tZn9-ATDLhUQywa-0Y-aU5XYxidD2FXUMiprZYpOUA6O2XBRg5Hf-'
    ],
    shortDescription: 'Solid beechwood stacking rainbow with 7 graduating curved arches dipped in organic child-safe water dye.',
    fullDescription: 'An heirloom piece for open-ended play. Children construct bridges, tunnels, cradles for dolls, or abstract architectural towers. Carved from FSC-certified Russian beechwood with rounded, splinter-free contours inspected at our Lahore workshop.',
    features: [
      '7 graduating nesting arches',
      'Non-toxic matte finish for non-slip stacking',
      'Promotes spatial reasoning & motor coordination',
      'Smooth edges without lacquer smells'
    ],
    materials: 'Solid Beechwood with food-grade waterborne organic pigments',
    safetyNotes: 'Tested against saliva transfer and impact splits. 100% lead-free.',
    dimensions: '26cm x 13cm x 5cm',
    isTrending: true
  },
  {
    id: 'ast-002',
    title: 'Retro Die-Cast Roadster (Pullback)',
    slug: 'retro-die-cast-roadster-pullback',
    category: 'die-cast',
    categoryName: 'Die-cast & Cars',
    ageRange: '3-5y',
    ageLabel: 'Ages 3+',
    price: 1890,
    originalPrice: 2290,
    discountBadge: 'SALE - Rs. 400 OFF',
    badgeType: 'sale',
    rating: 4.8,
    reviewsCount: 92,
    stock: 12,
    inStock: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8_MgVVUffk6XIPqR6lV2u-N-IybiTdmVBSOWZLTnvcKp_RYsNzYlLRyVt3itYlTlNo5NpN4UJmmn4YlcHZO8GIUlctf6C4l2XbPGAfJEJf4kd9VUA5FA4YN4gzMNEpZJ-CyiHfZmcDDIqqVMEcnYv1UxMygvvy0msCoQIbYwztitfkpSf-2l2MxrIkRlkAnbsfXIeAAKOY4Ppl0VsLBzOz8NCIwOK_Tfcn1f8Sta9vU5GdK2a4B6y',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD8_MgVVUffk6XIPqR6lV2u-N-IybiTdmVBSOWZLTnvcKp_RYsNzYlLRyVt3itYlTlNo5NpN4UJmmn4YlcHZO8GIUlctf6C4l2XbPGAfJEJf4kd9VUA5FA4YN4gzMNEpZJ-CyiHfZmcDDIqqVMEcnYv1UxMygvvy0msCoQIbYwztitfkpSf-2l2MxrIkRlkAnbsfXIeAAKOY4Ppl0VsLBzOz8NCIwOK_Tfcn1f8Sta9vU5GdK2a4B6y',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBL2f-kWV43rjIUdGyCk9dN2TdSeBAREsKQsIjwvRSgZUedube_El_3-ZN3AuhvDyPTsoST30NyFNzBt9pAVMdfGrw4NigWVm_MSrow7fHP1nbUNh7F1b1qvIF3HAZWiCA2qqw38-cxkmtE-X0csJf-IVpH-Qcpc8G1rp4tjnSDH4yolfm1Kyvv28eITZvc1A7O2a8xqPERe8xhiYYmOqQbLmB4L0Z-AxrSubmTUtN18DRGgqG-UpjJ'
    ],
    shortDescription: 'Heavyweight zinc-alloy vintage racer with high-torque pullback gear and real ribbed rubber tires.',
    fullDescription: 'Built like the timeless metal toys of previous generations. Features opening twin doors, authentic racing livery with number decal, and an internal steel coil motor that speeds across marble floors or carpets on pull-back.',
    features: [
      'Heavy cast zinc-alloy body that survives drops',
      'Grippy natural rubber tires',
      'High-velocity steel spring pullback motor',
      'Functional cockpit details and opening doors'
    ],
    materials: 'Zinc Alloy, ABS Chassis, High-Traction Rubber',
    safetyNotes: 'Certified non-toxic paint. Free from small detachable screws.',
    dimensions: '15cm x 6.5cm x 5cm',
    isTrending: true
  },
  {
    id: 'ast-003',
    title: 'Snuggle Bunny Plush Toy with Carrot',
    slug: 'snuggle-bunny-plush-toy',
    category: 'soft-dolls',
    categoryName: 'Soft Dolls & Plush',
    ageRange: '0-12m',
    ageLabel: 'Ages 0+',
    price: 1650,
    originalPrice: 1950,
    discountBadge: 'POPULAR',
    badgeType: 'hot',
    rating: 4.9,
    reviewsCount: 134,
    stock: 5,
    inStock: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiovzBdROpaQCADbKuquN854YJDBv4THgOVWUg64qh_pd6jY2TBkNYcNLci7DMPpZDEVVdaGcz9Chvt6qocsTRx7KrSIM6UP5vGzNh5hNU2C5qHQ06Z9zi5dzry5mYcOcR_02FbyIObzCnCG1qOSz3_gVsvG_l5XF6T7YdGRtQ2E8X2LE7sPnWDgT5iK8MUboDZIslUMxoK9SytRiBHlomEpyM6dy5gimXSOUBduy-lj-ITZSG8AtX',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBiovzBdROpaQCADbKuquN854YJDBv4THgOVWUg64qh_pd6jY2TBkNYcNLci7DMPpZDEVVdaGcz9Chvt6qocsTRx7KrSIM6UP5vGzNh5hNU2C5qHQ06Z9zi5dzry5mYcOcR_02FbyIObzCnCG1qOSz3_gVsvG_l5XF6T7YdGRtQ2E8X2LE7sPnWDgT5iK8MUboDZIslUMxoK9SytRiBHlomEpyM6dy5gimXSOUBduy-lj-ITZSG8AtX',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB-MDe4Ulbl4pHjt-sO9dlNplXf_eLl6qbPNATqjGDW6Iqq3N5lEbzJinnc1P7H0V_BPi8RtyhirrQ0LCZzkddZjADVr2NvqXBfZyYGAKniOyZx8EfvjMePF5QZv4_eZFWQOYixQvQ6ADn9PfFgy4wd2l8NABt7xjRMXn4bhvztLX5CXl4yDFOE_suK-HPJP2qTlPwDX7zsodb3NLxLHpYPRTsI9MOen3uUiDNuSd2gnsDE-a1N4wW2'
    ],
    shortDescription: '100% natural cotton knit bunny with floppy ears, embroidered face, and detachable knitted plush carrot.',
    fullDescription: 'Designed specifically for sensitive infant skin. Stuffed with hypoallergenic poly-cluster fill that holds shape through repeated machine washes. Zero hard plastic buttons or beads ensures total peace of mind for newborn sleep.',
    features: [
      '100% organic cotton exterior',
      'Embroidered sensory face (zero hard buttons)',
      'Detachable miniature plush carrot',
      'Machine washable on gentle cycle'
    ],
    materials: 'Pure Cotton Shell, Hypoallergenic Polyfiber Core',
    safetyNotes: 'Safe for newborns from Day 1. Anti-choke certified.',
    dimensions: '30cm full height',
    isTrending: true
  },
  {
    id: 'ast-004',
    title: 'Junior Explorer Watercolor Chest',
    slug: 'junior-explorer-watercolor-chest',
    category: 'arts-craft',
    categoryName: 'Arts, Clay & Craft',
    ageRange: '3-5y',
    ageLabel: 'Ages 4+',
    price: 2990,
    originalPrice: 3490,
    discountBadge: 'IN STORE COD',
    badgeType: 'hot',
    rating: 4.7,
    reviewsCount: 36,
    stock: 9,
    inStock: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoDYCmR0xMKds8mMvGwFxnldXAJLEOtBZUAkxs89Q03PZ8BMa9lw1kOsQCy1ofNN3zrVTtvvkmlWgXTI_eQeSkkeUAS5RadP7-VaJ9yF_oHapjZdsQK5K37EC43vFsiZqZv7EL10UE-U3QGAMDLQsDCmcox5kxqvWpLFmPkEHqDL-J_G6MSP1qTkEEgLxD2CTo9ILneo54Q9WoyQIaQbfkLKuNVxfSZE30IQhc4ZznExKtDvXEioou',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBoDYCmR0xMKds8mMvGwFxnldXAJLEOtBZUAkxs89Q03PZ8BMa9lw1kOsQCy1ofNN3zrVTtvvkmlWgXTI_eQeSkkeUAS5RadP7-VaJ9yF_oHapjZdsQK5K37EC43vFsiZqZv7EL10UE-U3QGAMDLQsDCmcox5kxqvWpLFmPkEHqDL-J_G6MSP1qTkEEgLxD2CTo9ILneo54Q9WoyQIaQbfkLKuNVxfSZE30IQhc4ZznExKtDvXEioou',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDUeFb6IJrHTrh8gWXYaJcKlOinai3k_xyDNPX4RAyqPJrspuIkG-ATQuPpu-j408VljCOllRIJkSOzpd30RQZrydng4XRtf8TTa2wyuwdiRNriyRuo5398jzV1bCmKafRXktYTUQzNUUgenrLPjfvBGEEnFTj71gxKQPf9IP7BhY_hijHN1Lk3sk4kMNW7J-H3AhlM4upf1LalusslASVMT_RYgUlKc6tPxGGxjCVXvh2sS8OYcsmH'
    ],
    shortDescription: 'Solid timber artist case containing 24 ultra-washable watercolor cakes, 4 natural pony hair brushes, palette and pad.',
    fullDescription: 'Give young painters a genuine creative studio. Formulated with ultra-rich pigments that wipe clean off hands, tiles, and school uniforms with simple tap water. Heavy pine chest latches shut for travel or visits to grandparents.',
    features: [
      '24 vivid watercolor cakes in metal trays',
      '4 fine natural bristles brushes',
      'Solid pine suitcase with metal brass clasp',
      'Washable formula safe on clothing and skin'
    ],
    materials: 'Pine Wood Case, Water-Soluble Pigments, Brass Fixtures',
    safetyNotes: 'AP non-toxic certified according to ASTM D-4236.',
    dimensions: '28cm x 20cm x 4.5cm',
    isTrending: true
  },
  {
    id: 'ast-005',
    title: 'Silicone Teething Ring & Soft Rattle Set',
    slug: 'silicone-teething-ring-soft-rattle',
    category: 'baby-toddler',
    categoryName: 'Baby & Toddler',
    ageRange: '0-12m',
    ageLabel: '3–18 Months',
    price: 1250,
    originalPrice: 1550,
    discountBadge: 'ESSENTIAL',
    badgeType: 'new',
    rating: 4.9,
    reviewsCount: 78,
    stock: 22,
    inStock: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXtY8CL0PvOz59SlQpWK0x1n_qq1hUx5sBj4bRJQNRD5pDEknTFCldY2J6ifMnnC6VfvgSZNd4fOOgxgRpLagbXbJohVT981e6JjwCjzJZshgKK2Fl1FvrKagm4GGvOExtXE9_aErdFgIym67zLpCvS3esgNHmzLEZWOJA2VfLe-XR5mh-nShPmt66IW803OLs-x4LOqkV-NJvh2ZdC-_8QlJmMHzfRuh1YA0SDJcUEhvIxiZI1-T2',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBXtY8CL0PvOz59SlQpWK0x1n_qq1hUx5sBj4bRJQNRD5pDEknTFCldY2J6ifMnnC6VfvgSZNd4fOOgxgRpLagbXbJohVT981e6JjwCjzJZshgKK2Fl1FvrKagm4GGvOExtXE9_aErdFgIym67zLpCvS3esgNHmzLEZWOJA2VfLe-XR5mh-nShPmt66IW803OLs-x4LOqkV-NJvh2ZdC-_8QlJmMHzfRuh1YA0SDJcUEhvIxiZI1-T2'
    ],
    shortDescription: 'Food-grade silicone beads intertwined with silky polished organic beechwood rings for sore gum relief.',
    fullDescription: 'Engineered by pediatric specialists to massage inflamed gums during tooth eruptions. Double-strung on reinforced parachute cord that resists tugging or cutting.',
    features: [
      '100% Medical-grade silicone + Natural beechwood',
      'Relieves teething soreness and chills well in fridge',
      'Gentle natural wooden rattle click sound',
      'Boil-safe silicone sections'
    ],
    materials: 'Food-Grade Silicone, Unvarnished Organic Beechwood',
    safetyNotes: 'BPA, Phthalate, and PVC Free. Certified saliva resistant.',
    dimensions: '12cm diameter',
    isEarlyYears: true
  },
  {
    id: 'ast-006',
    title: 'Musical Sensory Soft Activity Cube',
    slug: 'musical-sensory-soft-activity-cube',
    category: 'baby-toddler',
    categoryName: 'Baby & Toddler',
    ageRange: '0-12m',
    ageLabel: '6–24 Months',
    price: 2800,
    originalPrice: 3200,
    discountBadge: 'ONLY 3 LEFT',
    badgeType: 'hot',
    rating: 4.8,
    reviewsCount: 64,
    stock: 3,
    inStock: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa52XGrOQNII01H4VF0RgPd5GQdG3zQHcsENIAmcfGDMAYZCnLSs1cGwCGz9ZiE532nOr8S-xtQ2Y70knwVjTn48a_Ejn_OsEJJuj2ff-KiG46ousGOw5OgIVULacZCH2-_45hHuz1HxRYWoM7V8wBo_gFvSqZbuV8BvIIPcwitNgbUPrCB0GG6aTOG6bAtsGedekKRBJIzRzfJFrO0ScgD5jll68LfzVQB8OgPZI1RApPQz2HHwfO',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBa52XGrOQNII01H4VF0RgPd5GQdG3zQHcsENIAmcfGDMAYZCnLSs1cGwCGz9ZiE532nOr8S-xtQ2Y70knwVjTn48a_Ejn_OsEJJuj2ff-KiG46ousGOw5OgIVULacZCH2-_45hHuz1HxRYWoM7V8wBo_gFvSqZbuV8BvIIPcwitNgbUPrCB0GG6aTOG6bAtsGedekKRBJIzRzfJFrO0ScgD5jll68LfzVQB8OgPZI1RApPQz2HHwfO'
    ],
    shortDescription: '6-sided sensory exploration cube with crinkle leaves, peekaboo mirror, grasp ribbons, and gentle chime inside.',
    fullDescription: 'Keeps toddlers absorbed in car seats or playmats. Soft plush texture with high-contrast patterns specially tuned to early infant optical development.',
    features: [
      'Baby-safe distortion-free mirror',
      'Interior gentle rolling chime (no electronic batteries required!)',
      'Tactile ribbon tags & silicone teether leaf',
      'Loop fastener for stroller or crib attachment'
    ],
    materials: 'Micro-Velvet, Satin Ribbon, Cotton Padding',
    safetyNotes: 'Shatter-proof reflective film mirror. Machine washable.',
    dimensions: '16cm x 16cm x 16cm',
    isEarlyYears: true
  },
  {
    id: 'ast-007',
    title: 'Solid Montessori Shape Sorter Box',
    slug: 'solid-montessori-shape-sorter-box',
    category: 'wooden-montessori',
    categoryName: 'Wooden & Montessori',
    ageRange: '1-3y',
    ageLabel: '12–36 Months',
    price: 2150,
    originalPrice: 2500,
    discountBadge: 'MONTESSORI PICK',
    badgeType: 'sale',
    rating: 4.9,
    reviewsCount: 47,
    stock: 15,
    inStock: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0IxV5f6TAY-AP1XHfYS9tp5DRjJ70oiqmoI21GMkYavUtyWHX-O0E2HOr5xlkE8g3mICUCBdYzB2kX2PnVdP1pox9LlY2HiGrs2LIoB5ChHZjtCjV8o5iDOfP1W3DUhTbsgQxA7epVf-CYzYybtGqH6fFg3yAHop9psEKhiTwHPM96qZZUFuh8qFTogYNLDc7zpbAjoRtbdJcbdT91c7bhjZsGnEElhSvBepxFG4N5npcSY56ZOQa',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB0IxV5f6TAY-AP1XHfYS9tp5DRjJ70oiqmoI21GMkYavUtyWHX-O0E2HOr5xlkE8g3mICUCBdYzB2kX2PnVdP1pox9LlY2HiGrs2LIoB5ChHZjtCjV8o5iDOfP1W3DUhTbsgQxA7epVf-CYzYybtGqH6fFg3yAHop9psEKhiTwHPM96qZZUFuh8qFTogYNLDc7zpbAjoRtbdJcbdT91c7bhjZsGnEElhSvBepxFG4N5npcSY56ZOQa'
    ],
    shortDescription: '5 chunky solid pine prisms with gentle chamfered corners and sliding recovery lid.',
    fullDescription: 'A classic Montessori apparatus teaching object permanence and tactile geometry. Sized specifically to prevent choking while giving toddlers satisfying tactile clicks as shapes drop through matching cutouts.',
    features: [
      'Chunky wooden cylinder, cube, triangle, star, and hemisphere',
      'Smooth sliding wooden recovery drawer',
      'Non-toxic matte waterborne colors',
      'Heavy solid pine structure'
    ],
    materials: 'Sustainably Farmed Solid Pine Timber',
    safetyNotes: 'Large components exceed global anti-choke tube criteria.',
    dimensions: '15cm x 15cm x 13cm',
    isEarlyYears: true
  },
  {
    id: 'ast-008',
    title: 'Vintage Racing Alloy Coupe 1957',
    slug: 'vintage-racing-alloy-coupe',
    category: 'die-cast',
    categoryName: 'Die-cast & Cars',
    ageRange: '3-5y',
    ageLabel: 'Ages 3+',
    price: 1950,
    originalPrice: 2400,
    discountBadge: 'LIMITED',
    badgeType: 'hot',
    rating: 4.8,
    reviewsCount: 41,
    stock: 8,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: '1:32 scale classic Le Mans road racer with die-cast alloy metal shell, working suspension, and opening hood.',
    fullDescription: 'Every car enthusiast child in Pakistan falls in love with this retro grand tourer. Complete with detailed dashboard dials, chrome bumper trims, and pullback momentum drive.',
    features: [
      'Working front spring suspension',
      'High-gloss automotive acrylic enamel finish',
      'Detailed interior with steering wheel and gear shift',
      'Fast pullback action'
    ],
    materials: 'Die-Cast Zinc Alloy, Polycarbonate Windshield',
    safetyNotes: 'Smooth rounded edges, zero burrs.',
    dimensions: '14cm x 6cm x 4.5cm'
  },
  {
    id: 'ast-009',
    title: 'Organic Sensory Modeling Dough Bucket (6 Tubs)',
    slug: 'organic-sensory-modeling-dough',
    category: 'arts-craft',
    categoryName: 'Arts, Clay & Craft',
    ageRange: '1-3y',
    ageLabel: 'Ages 2+',
    price: 1750,
    originalPrice: 2100,
    discountBadge: 'NATURAL WAX',
    badgeType: 'new',
    rating: 4.9,
    reviewsCount: 53,
    stock: 19,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: '6 airtight tubs of edible-grade wheat flour dough infused with soothing natural vanilla aroma.',
    fullDescription: 'Forget salty, crumbly chemical doughs. This soft dough never dries out if kept in its tubs and does not stain Persian carpets or clothes. Packed with 4 wooden cutter stamps.',
    features: [
      '6 vibrant colors made from plant extracts',
      'Includes 4 wooden impression stamps',
      'Leaves zero residue on hands or tables',
      '100% food-safe ingredients'
    ],
    materials: 'Organic Wheat Flour, Salt, Coconut Oil, Natural Food Coloring',
    safetyNotes: 'Accidentally edible! Zero bitter artificial chemicals.',
    dimensions: '6 x 120g tubs in storage bucket'
  },
  {
    id: 'ast-010',
    title: 'Wooden Geometric Pattern Tangram Logic Board',
    slug: 'wooden-tangram-logic-board',
    category: 'puzzles-brains',
    categoryName: 'Puzzles & Brain Games',
    ageRange: '3-5y',
    ageLabel: 'Ages 4+',
    price: 1850,
    originalPrice: 2200,
    discountBadge: 'STEM CHOICE',
    badgeType: 'sale',
    rating: 4.7,
    reviewsCount: 29,
    stock: 11,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: '36 smooth wooden puzzle blocks with 50 progressive challenge cards ranging from beginner animals to complex 3D illusions.',
    fullDescription: 'Fosters intense focus and screen-free concentration. Kids arrange wooden polygon pieces inside a solid linden frame to reproduce silhouettes shown on flash cards.',
    features: [
      '36 precision laser-cut beech blocks',
      '50 laminated challenge cards with solutions on reverse',
      'Canvas drawstring pouch for neat cleanup',
      'Develops visual-spatial acuity and geometric cognition'
    ],
    materials: 'Linden Wood, Soy Ink Prints, Cotton Storage Bag',
    safetyNotes: 'Large pieces, water-based non-toxic lacquer.',
    dimensions: '22cm x 22cm x 2cm'
  },
  {
    id: 'ast-011',
    title: 'Little Ballerina Hand-Stitched Fabric Doll',
    slug: 'little-ballerina-fabric-doll',
    category: 'soft-dolls',
    categoryName: 'Soft Dolls & Plush',
    ageRange: '1-3y',
    ageLabel: 'Ages 18m+',
    price: 2300,
    originalPrice: 2700,
    discountBadge: 'HANDMADE',
    badgeType: 'new',
    rating: 4.9,
    reviewsCount: 44,
    stock: 7,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: 'Hand-sewn linen doll with layered tulle tutu, embroidered smiling eyes, and soft yarn hair buns.',
    fullDescription: 'A companion for tea parties and quiet bedtime storytelling. Soft yet durable enough to withstand being toted along on family visits across the country.',
    features: [
      'Natural linen and organic cotton muslin dress',
      'Removable tulle tutu and velvet ballet slippers',
      'Soft huggable filling that keeps shape',
      'Gentle hand washable'
    ],
    materials: 'Linen, Cotton Muslin, Soft Tulle',
    safetyNotes: 'No wires or sharp pins. Entirely stitched construction.',
    dimensions: '36cm height'
  },
  {
    id: 'ast-012',
    title: 'Solid Beechwood Geometric Stacking Train',
    slug: 'beechwood-geometric-stacking-train',
    category: 'wooden-montessori',
    categoryName: 'Wooden & Montessori',
    ageRange: '1-3y',
    ageLabel: 'Ages 18m+',
    price: 2750,
    originalPrice: 3200,
    discountBadge: 'TOP RATED',
    badgeType: 'hot',
    rating: 5.0,
    reviewsCount: 68,
    stock: 10,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&auto=format&fit=crop&q=80'
    ],
    shortDescription: '18-piece modular locomotive with 2 rolling carriages and colorful interchangeable stacking pegs.',
    fullDescription: 'Toddlers roll the train across rugs while experimenting with peg sorting and color rhythms. Thick wooden wheels roll silently on heavy carpet or tile floors.',
    features: [
      '3 detachable rolling train carts with brass couplers',
      '15 chunky colorful blocks with center holes',
      'Real rolling action with smooth rounded wooden axles',
      'Durable construction meant to last generations'
    ],
    materials: 'High-Density Beechwood, Water-Based Non-Toxic Paint',
    safetyNotes: 'All pegs are securely anchored and blunt.',
    dimensions: '38cm x 8cm x 10cm'
  }
];

export const PAKISTANI_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Peshawar',
  'Faisalabad',
  'Multan',
  'Gujranwala',
  'Sialkot',
  'Quetta',
  'Hyderabad',
  'Abbottabad',
  'Sargodha',
  'Bahawalpur',
  'Sukkur',
  'Mirpur (AJK)',
  'Mardan',
  'Gujrat',
  'Other Pakistan City'
];
