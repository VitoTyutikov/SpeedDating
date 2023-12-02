// package vito.speeddating.entity;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.Table;
// import lombok.AllArgsConstructor;
// import lombok.Getter;
// import lombok.NoArgsConstructor;
// import lombok.Setter;

// @AllArgsConstructor
// @NoArgsConstructor
// @Getter
// @Setter
// @Table
// @Entity
// public class UserEventEntity {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @ManyToOne
//     @JoinColumn(name = "event_id", nullable = false)
//     private EventEntity event;

//     @ManyToOne
//     @JoinColumn(name = "user_id", nullable = false)
//     private UserEntity user;
// }
